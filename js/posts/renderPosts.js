import { fetchAllPosts } from "/js/posts/fetchAllPosts.js";

export async function renderPosts(post) {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.username || "defaultName";
  const id = post?.id;

  try {
    const data = await fetchAllPosts(id);

    const postsContainer = document.getElementById("posts-container");
    if (!postsContainer) {
      console.error("Could not find posts-container element.");
      return;
    }

    // Generer HTML for innleggene
    postsContainer.innerHTML = data
      .map(
        (data) => `
      <div class="post">
      <a href="/post/index.html?id=${data.id}">
        <img src="${
          data.media?.url || "https://via.placeholder.com/150"
        }" alt="${data.title}" class="post-thumbnail" /></a>
        <h2>${data.title}</h2>
       
        <button class="edit-post-btn" data-id="${data.id}">Edit Post</button>
      </div>
    `
      )
      .join("");

    // Legg til event listeners for alle edit-knapper
    document.querySelectorAll(".edit-post-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const postId = event.target.getAttribute("data-id"); // Hent ID fra knappen
        window.location.href = `/post/edit.html?id=${postId}`; // Omdiriger til edit.html med ID som parameter
      });
    });
  } catch (error) {
    console.error("Error fetching posts:", error);

    const postsContainer = document.getElementById("posts-container");
    if (postsContainer) {
      postsContainer.innerHTML = `<p>Could not fetch posts.</p>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
});
