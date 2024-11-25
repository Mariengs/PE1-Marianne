import { BASE_URL } from "/js/constants/api.js";

const accessToken = localStorage.getItem("accessToken");
const id = new URLSearchParams(window.location.search).get("id");
const name = JSON.parse(localStorage.getItem("user")).username;

if (!accessToken) {
  alert("You must be logged in to edit this post.");
  window.location.href = "/account/login.html";
}

async function updatePost(event) {
  event.preventDefault();

  // Hent verdier fra input-feltene
  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!title || !body) {
    alert("Title og body kan ikke være tomme.");
    return;
  }

  const postData = {
    title,
    body,
    image,
  };

  try {
    const response = await fetch(`${BASE_URL}blog/posts/${name}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Error updating post: ${response.status}`);
    }

    const updatedPost = await response.json();
    alert("Post updated!");
    console.log("Oppdatert innlegg:", updatedPost);

    // Omdirigerer tilbake til forsiden (eller visningen av innlegget)
    window.location.href = `/index.html`;
  } catch (error) {
    console.error("Error updating post:", error);
    alert("Couldn't update post.");
  }
}

async function deletePost() {
  if (!confirm("Are you sure you want to delete this post?")) return;

  try {
    const response = await fetch(`${BASE_URL}blog/posts/${name}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Couldn't delete post");

    alert("Post deleted successfully!");
    window.location.href = "/";
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Couldn't delete post.");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.getElementById("delete-button");
  const editForm = document.getElementById("editForm");

  if (deleteButton && editForm) {
    deleteButton.addEventListener("click", () => {
      const id = editForm.getAttribute("data-id"); // Hent ID fra data-id
      const name = JSON.parse(localStorage.getItem("user")).username;

      if (confirm("Are you sure you want to delete this post?")) {
        deletePost(name, id);
      }
    });
  } else {
    console.error("Form elements not found!");
  }
});

import { fetchPostById } from "/js/posts/singlePost.js";

// Fyll skjemaet med innlegg-data
async function loadEditForm() {
  const data = await fetchPostById(id);
  if (!data) return;

  // Finn de relevante input-elementene før du setter verdiene
  const titleInput = document.getElementById("title");
  const bodyInput = document.getElementById("body");
  const imageInput = document.getElementById("image");

  if (titleInput) {
    titleInput.value = data.data.title || "";
  }

  if (bodyInput) {
    bodyInput.value = data.data.body || "";
  }

  if (imageInput) {
    imageInput.value = data.data.media.url || "";
  }

  const editForm = document.getElementById("editForm");
  const deleteButton = document.getElementById("delete-post");

  if (editForm) {
    editForm.addEventListener("submit", updatePost);
  }

  if (deleteButton) {
    deleteButton.addEventListener("click", deletePost);
  }
}

document.addEventListener("DOMContentLoaded", loadEditForm);
