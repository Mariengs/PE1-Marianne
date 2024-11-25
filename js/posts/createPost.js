import { BASE_URL } from "/js/constants/api.js";

const user = JSON.parse(localStorage.getItem("user"));
const name = user?.username || "defaultName";

const accessToken = localStorage.getItem("accessToken");

if (!accessToken) {
  alert("You must be logged in to create a post.");
  window.location.href = "/account/login.html";
}

async function createPost(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const image = document.getElementById("image").value;

  const postData = {
    title,
    body,
    tags: [],
    media: {
      url: image,
      alt: "Post image",
    },
  };

  const apiUrl = `${BASE_URL}blog/posts/${name}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.status}`);
    }

    const newPost = await response.json();
    alert("Post created successfully!");

    window.location.href = "/";
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Could not create post.");
  }
}

document
  .getElementById("createPostForm")
  .addEventListener("submit", createPost);
