import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadBtn = document.querySelector(".load-more-btn");

const lboxOptions = {
  captionsData: "alt",
  captionDelay: 250
}

const lightbox = new SimpleLightbox('.gallery a', lboxOptions);

iziToast.settings({
  messageColor: '#fff',
  backgroundColor: '#EF4040',
  position: 'topRight'
});

let page = 1;
let perPage = 40;
let searchImg = '';
let totalHits = 500;

async function fetchPosts(searchImg) {
  const searchParams = new URLSearchParams({
    key: '41673326-36a35a0e0851ae97a957fbd95',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    q: searchImg,
    page: page,
    per_page: perPage
  })
  const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  return response.data; 
}

async function loadImages() {
  loadBtn.classList.remove("load-btn-active");
  loader.classList.add("loader-active");
  if (gallery.children.length >= totalHits) {
    loadBtn.classList.remove("load-btn-active"); 
    loader.classList.remove("loader-active");
    return iziToast.show({message: "We're sorry, but you've reached the end of search results."});
  }
  try {
    const images = await fetchPosts(searchImg);
    if (page === 1 && !images.hits.length) {
     iziToast.show({ message: 'Sorry, there are no images matching your search query. Please try again!'});
    } else {
      page++;
      totalHits = images.totalHits;
      renderImages(images.hits);
      loadBtn.classList.add("load-btn-active");
    } 
  } catch (error) { 
    iziToast.show({ message: `${error}`});
  } finally {
    loader.classList.remove("loader-active");
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  gallery.textContent = '';
  page = 1;
  searchImg = event.currentTarget.search.value;
  loadImages();
  event.currentTarget.reset();
});

loadBtn.addEventListener("click", event => {
  loadImages();
})

function renderImages(images) {
  const str = images.reduce((acc, e) => acc + `
    <li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img
          class="gallery-image"
          src="${e.webformatURL}"
          data-source="${e.largeImageURL}"
          alt="${e.tags}"
        />
      </a>
      <ul>
        <li><b>Likes</b> ${e.likes}</li>
        <li><b>Views</b> ${e.views}</li>
        <li><b>Comments</b> ${e.comments}</li>
        <li><b>Downloads</b> ${e.downloads}</li>
      </ul>
    </li>`, ''
  );
  gallery.insertAdjacentHTML("beforeend", str);
  lightbox.refresh();
  if (page > 2) {
    const cardHeight = document.querySelectorAll(".gallery-item")[0].getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth"
    });
  }
}