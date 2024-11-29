import { BASE_URL } from "./constants/api.js";

const name = "mareng";

document.addEventListener("DOMContentLoaded", async () => {
  const carouselInner = document.querySelector(".carousel-inner");
  const nextButton = document.querySelector(".carousel-control.next");
  const prevButton = document.querySelector(".carousel-control.prev");

  let currentSlide = 0;
  let slides = [];

  async function fetchAllPosts() {
    try {
      const response = await fetch(`${BASE_URL}blog/posts/${name}`);
      if (!response.ok) {
        throw new Error(
          `HTTP-error! Status: ${response.status} - ${response.statusText}`
        );
      }
      const data = await response.json();

      const posts = data.data;

      if (Array.isArray(posts)) {
        return posts.slice(0, 3);
      } else {
        console.error("Data is not an array.");
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      return [];
    }
  }

  function generateCarousel(data) {
    data.forEach((post, index) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      if (index === 0) slide.classList.add("active");
      slide.setAttribute("data-url", `post.html?id=${post.id}`);

      const imageElement = document.createElement("img");
      imageElement.src = post.media.url;
      imageElement.alt = post.title;

      const titleElement = document.createElement("div");
      titleElement.className = "title";
      titleElement.textContent = post.title;

      slide.appendChild(imageElement);
      slide.appendChild(titleElement);
      carouselInner.appendChild(slide);
    });

    slides = document.querySelectorAll(".carousel-slide");

    slides.forEach((slide) => {
      slide.addEventListener("click", () => {
        const url = slide.getAttribute("data-url");
        if (url) {
          window.location.href = url;
        }
      });
    });
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  const carouselData = await fetchAllPosts();
  if (!Array.isArray(carouselData) || carouselData.length === 0) {
    carouselInner.innerHTML = "<p>No data found.</p>";
    return;
  }

  generateCarousel(carouselData);
  showSlide(currentSlide);
});
