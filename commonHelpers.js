import{S as h,i,a as y}from"./assets/vendor-bad0427b.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const p=document.querySelector(".search-form"),u=document.querySelector(".gallery"),d=document.querySelector(".loader"),n=document.querySelector(".load-more-btn"),b={captionsData:"alt",captionDelay:250},L=new h(".gallery a",b);i.settings({messageColor:"#fff",backgroundColor:"#EF4040",position:"topRight"});let l=1,v=40,g="",m=500;async function w(e){const s=new URLSearchParams({key:"41673326-36a35a0e0851ae97a957fbd95",image_type:"photo",orientation:"horizontal",safesearch:"true",q:e,page:l,per_page:v});return(await y.get(`https://pixabay.com/api/?${s}`)).data}async function f(){n.classList.remove("load-btn-active"),d.classList.add("loader-active");try{const e=await w(g);l===1&&!e.hits.length?i.show({message:"Sorry, there are no images matching your search query. Please try again!"}):(l++,m=e.totalHits,S(e.hits),n.classList.add("load-btn-active")),u.children.length>=m&&(n.classList.remove("load-btn-active"),d.classList.remove("loader-active"),i.show({message:"We're sorry, but you've reached the end of search results."}))}catch(e){i.show({message:`${e}`})}finally{d.classList.remove("loader-active")}}p.addEventListener("submit",e=>{e.preventDefault(),l=1,g=e.currentTarget.search.value,u.textContent="",f(),e.currentTarget.reset()});n.addEventListener("click",e=>{f()});function S(e){const s=e.reduce((a,r)=>a+`
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
    </li>`,"");if(u.insertAdjacentHTML("beforeend",s),L.refresh(),l>2){const a=document.querySelectorAll(".gallery-item")[0].getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}}
//# sourceMappingURL=commonHelpers.js.map
