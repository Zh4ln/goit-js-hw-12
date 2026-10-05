import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

let currentQuery = '';
let page = 1;

const perPage = 15;

form.addEventListener('submit', handleSearch);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });

    return;
  }

  currentQuery = query;
  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);

    smoothScroll();

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    page -= 1;

    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });

    showLoadMoreButton();
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');

  if (!galleryItem) {
    return;
  }

  const cardHeight = galleryItem.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}