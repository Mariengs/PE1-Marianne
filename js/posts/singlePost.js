import { BASE_URL } from "/js/constants/api.js";

const accessToken = localStorage.getItem("accessToken");
const name = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).username
  : null;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (!accessToken || !name) {
  alert("You must be logged in to view the post.");
  console.error("Missing accessToken or user in localStorage");
}

export async function fetchPostById(id) {
  try {
    const response = await fetch(`${BASE_URL}blog/posts/${name}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching post: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    alert("Could not load post.");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!id) {
    console.error("Post ID is missing.");
    alert("Post ID is missing in URL.");
    return;
  }

  const data = await fetchPostById(id);

  if (data) {
    const titleElement = document.getElementById("title");
    const bodyElement = document.getElementById("body");
    const imageElement = document.getElementById("image");

    if (titleElement) titleElement.textContent = data.data.title || "No title";

    if (bodyElement)
      bodyElement.textContent = data.data.body || "No content available.";

    if (imageElement)
      imageElement.src =
        data.data.media.url || "https://via.placeholder.com/150";
  } else {
    console.error("Could not load post data.");
  }
});
