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

    data.slice(0, 12).forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      const linkElement = document.createElement("a");
      linkElement.href = `/post/index.html?id=${post.id}`;

      const imgElement = document.createElement("img");
      imgElement.src = post.media?.url || "https://via.placeholder.com/150";
      imgElement.alt = post.title;
      imgElement.classList.add("post-thumbnail");

      linkElement.appendChild(imgElement);

      const titleElement = document.createElement("h3");
      titleElement.textContent = post.title;

      postElement.appendChild(linkElement);
      postElement.appendChild(titleElement);

      if (user) {
        const editButton = document.createElement("button");
        editButton.classList.add("edit-post-btn");
        editButton.textContent = "Edit Post";
        editButton.dataset.id = post.id;
        postElement.appendChild(editButton);
      }

      postsContainer.appendChild(postElement);
    });

    document.querySelectorAll(".edit-post-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const postId = event.target.getAttribute("data-id");
        window.location.href = `/post/edit.html?id=${postId}`;
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
