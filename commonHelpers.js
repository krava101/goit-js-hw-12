import{i as d,S as h,a as y}from"./assets/vendor-bad0427b.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const p=document.querySelector(".search-form"),u=document.querySelector(".gallery"),i=document.querySelector(".loader"),l=document.querySelector(".load-more-btn");d.settings({messageColor:"#fff",backgroundColor:"#EF4040",position:"topRight"});let n=1,m=40,f="";async function b(e){const a=new URLSearchParams({key:"41673326-36a35a0e0851ae97a957fbd95",image_type:"photo",orientation:"horizontal",safesearch:"true",q:e,page:n,per_page:m});return(await y.get(`https://pixabay.com/api/?${a}`)).data}async function g(){l.classList.remove("load-btn-active"),i.classList.add("loader-active");try{const e=await b(f);e.hits.length<=0?(d.show({message:"Sorry, there are no images matching your search query. Please try again!"}),i.classList.remove("loader-active")):Math.ceil(e.totalHits/m)<n?(d.show({message:"We're sorry, but you've reached the end of search results."}),i.classList.remove("loader-active"),l.classList.remove("load-btn-active")):(L(e.hits),i.classList.remove("loader-active"),l.classList.add("load-btn-active"))}catch(e){console.error(e)}}p.addEventListener("submit",async e=>{e.preventDefault(),u.textContent="",n=1,f=e.currentTarget.search.value,g(),e.currentTarget.reset()});l.addEventListener("click",e=>{n++,g()});function L(e){const a=e.reduce((o,r)=>o+`
    <li class="gallery-item">
      <a class="gallery-link" href="${r.largeImageURL}">
        <img
          class="gallery-image"
          src="${r.webformatURL}"
          data-source="${r.largeImageURL}"
          alt="${r.tags}"
        />
      </a>
      <ul>
        <li><b>Likes</b> ${r.likes}</li>
        <li><b>Views</b> ${r.views}</li>
        <li><b>Comments</b> ${r.comments}</li>
        <li><b>Downloads</b> ${r.downloads}</li>
      </ul>
    </li>`,"");u.insertAdjacentHTML("beforeend",a),w.refresh()}const v={captionsData:"alt",captionDelay:250},w=new h(".gallery a",v);
//# sourceMappingURL=commonHelpers.js.map
