import{a as S,S as P,i as n}from"./assets/vendor-C1DvvBV_.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const q="57875356-ee282ee6bcc8c1ae18b82ea3b",M="https://pixabay.com/api/";async function p(t,o){return(await S.get(M,{params:{key:q,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}const m=document.querySelector(".gallery"),f=document.querySelector(".loader"),g=document.querySelector(".load-more"),B=new P(".gallery a",{captionsData:"alt",captionDelay:250});function h(t){const o=t.map(({webformatURL:s,largeImageURL:i,tags:e,likes:r,views:c,comments:v,downloads:w})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${i}">
            <img
              class="gallery-image"
              src="${s}"
              alt="${e}"
            />
          </a>

          <div class="image-info">
            <p class="info-item">
              <b>Likes</b>
              <span>${r}</span>
            </p>

            <p class="info-item">
              <b>Views</b>
              <span>${c}</span>
            </p>

            <p class="info-item">
              <b>Comments</b>
              <span>${v}</span>
            </p>

            <p class="info-item">
              <b>Downloads</b>
              <span>${w}</span>
            </p>
          </div>
        </li>
      `).join("");m.insertAdjacentHTML("beforeend",o),B.refresh()}function R(){m.innerHTML=""}function y(){f.classList.add("is-visible")}function b(){f.classList.remove("is-visible")}function u(){g.classList.add("is-visible")}function l(){g.classList.remove("is-visible")}const $=document.querySelector(".form"),O=document.querySelector(".load-more");let d="",a=1;const L=15;$.addEventListener("submit",x);O.addEventListener("click",E);async function x(t){t.preventDefault();const o=t.currentTarget.elements["search-text"].value.trim();if(o===""){n.warning({message:"Please enter a search query.",position:"topRight"});return}d=o,a=1,R(),l(),y();try{const s=await p(d,a);if(s.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(s.hits);const i=Math.ceil(s.totalHits/L);a<i?u():(l(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{n.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{b()}}async function E(){a+=1,l(),y();try{const t=await p(d,a);h(t.hits),H();const o=Math.ceil(t.totalHits/L);a<o?u():(l(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a-=1,n.error({message:"Something went wrong. Please try again later.",position:"topRight"}),u()}finally{b()}}function H(){const t=document.querySelector(".gallery-item");if(!t)return;const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
