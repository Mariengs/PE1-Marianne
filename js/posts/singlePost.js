import { BASE_URL } from "/js/constants/api.js";

const accessToken = localStorage.getItem("accessToken");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

export async function fetchPostById(id) {
  const userData = localStorage.getItem("user");
  const name = "mareng";

  if (!id || !name) {
    console.error("Missing id or name for fetching post.");
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}blog/posts/${name}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching post: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    alert("Could not load post.");
    return null;
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  if (!id) {
    console.error("Post ID is missing.");
    alert("Post ID is missing in URL.");
    return;
  }

  const data = await fetchPostById(id);
  const user = JSON.parse(localStorage.getItem("user"));

  if (data) {
    const titleElement = document.getElementById("title");
    const bodyElement = document.getElementById("body");
    const imageElement = document.getElementById("image");
    // const altElement = document.getElementById("alt");
    const authorElement = document.getElementById("author");
    const lastUpdatedElement = document.getElementById("updated");

    if (titleElement) titleElement.textContent = data.data.title || "No title";
    if (bodyElement)
      bodyElement.textContent = data.data.body || "No content available.";
    if (imageElement)
      imageElement.src =
        data.data.media.url || "https://via.placeholder.com/150";
    // if (altElement)
    //   altElement.textContent = data.data.media.alt || "No alt text available.";
    if (authorElement)
      authorElement.textContent =
        data.data.author.name || "No author available.";
    authorElement.textContent = `Written by Marianne`;

    // const authorName = data.data.author?.name || "No author available.";
    // authorElement.textContent = `Author: ${authorName}`;

    if (imageElement && data.data.media && data.data.media.url) {
      imageElement.src = data.data.media.url;
    } else {
      imageElement.src = "https://via.placeholder.com/150";
    }

    if (lastUpdatedElement) {
      const updatedDate = new Date(data.data.updated);
      lastUpdatedElement.textContent = `Last updated: ${updatedDate.toLocaleString()}`;

      const editButton = document.getElementById("editButton");
      if (editButton) {
        editButton.onclick = () => {
          window.location.href = `edit.html?id=${id}`;
        };
      }
    }

    const editButton = document.getElementById("editButton");
    const deleteButton = document.getElementById("deleteButton");

    if (accessToken) {
      if (editButton) editButton.style.display = "inline-block";
      if (deleteButton) deleteButton.style.display = "inline-block";

      if (editButton) {
        editButton.onclick = () => {
          window.location.href = `post/edit.html?id=${id}`;
        };
      }

      if (deleteButton) {
        deleteButton.onclick = () => {
          deletePost(id);
        };
      }
    } else {
      if (editButton) editButton.style.display = "none";
      if (deleteButton) deleteButton.style.display = "none";
    }
  } else {
    console.error("Could not load post data.");
  }
});

async function deletePost(id) {
  if (!accessToken) {
    alert("You must be logged in to delete this post.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}blog/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Post deleted successfully!");
      window.location.href = "/";
    } else {
      throw new Error("Failed to delete post");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Could not delete post.");
  }
}

window.logout = logout;

function isLoggedIn() {
  return localStorage.getItem("accessToken") !== null;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  updateHeaderButtons();
  window.location.href = "/";
}

function updateHeaderButtons() {
  const buttonsHeader = document.querySelector(".buttonsheader");

  if (isLoggedIn()) {
    buttonsHeader.innerHTML = `
      <button onclick="window.location.href='../post/create.html'">Create New Post</button>
      <button onclick="logout()">Logout</button>
    `;
  } else {
    buttonsHeader.innerHTML = `
      <button onclick="window.location.href='../account/login.html'">Login</button>
      <button onclick="window.location.href='../account/register.html'">Register</button>
    `;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.querySelector(".logout-btn");

  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
});

document.addEventListener("DOMContentLoaded", updateHeaderButtons);
