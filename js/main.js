import { renderPosts } from "./posts/renderPosts.js";

renderPosts();
document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.querySelector("#posts-container");
});

// // Funksjon for å lage HTML for innleggene
// function createPostGrid(posts) {
//   return posts
//     .map(
//       (post) => `
//       <div class="post">
//         <img src="${post.image || "https://via.placeholder.com/150"}" alt="${
//         post.title
//       }" class="post-thumbnail" data-id="${post.id}" />
//         <h3>${post.title}</h3>
//         <p>${post.body.substring(0, 100)}...</p>
//       </div>
//     `
//     )
//     .join("");
// }

// Funksjon for å hente og vise innlegg
//   async function fetchAndDisplayPosts() {
//     try {
//       const data = fetchAllPosts();

//       if (data && data.posts) {
//         // Generer grid og legg til i DOM
//         postsContainer.innerHTML = createPostGrid(data.posts);

//         // Legg til klikkhendelser for "post-thumbnail"
//         document.querySelectorAll(".post-thumbnail").forEach((thumbnail) => {
//           thumbnail.addEventListener("click", () => {
//             const postId = thumbnail.getAttribute("data-id");
//             window.location.href = `/post/index.html?id=${postId}`;
//           });
//         });
//       } else {
//         postsContainer.innerHTML = `<p>Ingen innlegg funnet.</p>`;
//       }
//     } catch (error) {
//       console.error("Kunne ikke hente blogginnlegg:", error);
//       postsContainer.innerHTML = `<p>Kunne ikke laste blogginnlegg. Vennligst prøv igjen senere.</p>`;
//     }
//   }

//   // Hent og vis innlegg når siden er klar

//   fetchAndDisplayPosts();
// });
