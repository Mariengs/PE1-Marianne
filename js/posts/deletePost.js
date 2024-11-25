import { BASE_URL } from "../constants/api.js";

const yourAccessToken = localStorage.getItem("accessToken"); // Hent token fra lagring

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

    // Om ønskelig, omdiriger brukeren tilbake til en annen side:
    window.location.href = "/"; // Endre til riktig destinasjon
  } catch (error) {
    console.error("Something went wrong:", error.message);
    alert("Couldn't delete post. Try again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.getElementById("delete-button");
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id"); // Hent ID fra URL-en
  const editForm = document.getElementById("editForm");

  deleteButton.addEventListener("click", () => {
    const postId = editForm.getAttribute("data-id"); // Hent ID fra data-id
    const postType = "posts"; // Endre denne hvis endpointet har et annet navn

    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(postType, id);
    }
  });
});

// Eksempel på bruk:
// deletePost("username", "my-post-id");
