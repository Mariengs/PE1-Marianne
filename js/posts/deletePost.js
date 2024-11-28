import { BASE_URL } from "../constants/api.js";

const yourAccessToken = localStorage.getItem("accessToken");

export async function deletePost(name, id) {
  try {
    const response = await fetch(`${BASE_URL}/${name}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${yourAccessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP-error! Status: ${response.status}`);
    }

    console.log(`Post with ID: ${id} deleted successfully`);
    alert("The post has been deleted!");

    window.location.href = "/";
  } catch (error) {
    console.error("Something went wrong:", error.message);
    alert("Couldn't delete post. Try again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.querySelector(".delete-button");

  if (!deleteButton) {
    console.error("Delete button not found in the DOM.");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const editForm = document.getElementById("editForm");

  deleteButton.addEventListener("click", () => {
    const postId = editForm ? editForm.getAttribute("data-id") : null;
    const postType = "posts";

    if (!id && !postId) {
      alert("No valid post ID found.");
      return;
    }

    const finalId = id || postId;

    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(postType, finalId);
    }
  });
});

// Eksempel på bruk:
// deletePost("username", "my-post-id");
