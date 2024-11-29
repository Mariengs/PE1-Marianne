import { BASE_URL } from "/js/constants/api.js";

const accessToken = localStorage.getItem("accessToken");
const userData = localStorage.getItem("user");

if (!accessToken || !userData) {
  alert("You must be logged in to access this page.");
  window.location.href = "login.html";
}

const user = JSON.parse(userData);
const name = user?.username;

if (!name) {
  alert("Invalid user data. Please log in again.");
  window.location.href = "/account/login.html";
}

export async function updatePost(event) {
  event.preventDefault();

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

    author: {
      name: name,
    },
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

    window.location.href = `/`;
  } catch (error) {
    console.error("Error updating post:", error);
    alert("Couldn't update post.");
  }
}

export async function deletePost() {
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
      const id = editForm.getAttribute("data-id");
      const name = JSON.parse(localStorage.getItem("user")).username;

      if (confirm("Are you sure you want to delete this post?")) {
        deletePost(name, id);
      }
    });
  } else {
    console.error("Form elements not found!");
  }
});

const id = new URLSearchParams(window.location.search).get("id");

import { fetchPostById } from "/js/posts/singlePost.js";

async function loadEditForm() {
  const data = await fetchPostById(id);
  if (!data) return;

  const titleInput = document.getElementById("title");
  const bodyInput = document.getElementById("body");
  const imageInput = document.getElementById("image");
  const authorInput = document.getElementById("author");

  if (titleInput) {
    titleInput.value = data.data.title || "";
  }

  if (bodyInput) {
    bodyInput.value = data.data.body || "";
  }

  if (imageInput) {
    imageInput.value = data.data.media.url || "";
  }

  if (authorInput) {
    authorInput.value = data.data.author.name || "";
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
