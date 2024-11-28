import { BASE_URL } from "/js/constants/api.js";

const accessToken = localStorage.getItem("accessToken");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const name = "mareng";

export async function fetchPostById(id) {
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

    // Vis posttittelen og innholdet
    if (titleElement) titleElement.textContent = data.data.title || "No title";
    if (bodyElement)
      bodyElement.textContent = data.data.body || "No content available.";
    if (imageElement)
      imageElement.src =
        data.data.media.url || "https://via.placeholder.com/150";

    // Legg til sjekk for media.url
    if (imageElement && data.data.media && data.data.media.url) {
      imageElement.src = data.data.media.url;
    } else {
      imageElement.src = "https://via.placeholder.com/150"; // Fallback bilde
    }

    // Vis rediger og slett knapper kun for innloggede brukere
    const editButton = document.getElementById("edit-button");
    const deleteButton = document.getElementById("delete-button");

    if (accessToken) {
      // Vis knappene hvis innlogget
      if (editButton) editButton.style.display = "inline-block";
      if (deleteButton) deleteButton.style.display = "inline-block";

      // Definer handling for knappene
      if (editButton) {
        editButton.onclick = () => {
          window.location.href = `post/edit.html?id=${id}`; // Send brukeren til redigeringssiden
        };
      }

      if (deleteButton) {
        deleteButton.onclick = () => {
          deletePost(id);
        };
      }
    } else {
      // Skjul knappene hvis ikke innlogget
      if (editButton) editButton.style.display = "none";
      if (deleteButton) deleteButton.style.display = "none";
    }
  } else {
    console.error("Could not load post data.");
  }
});

// Funksjon for å slette innlegg (kun for innloggede brukere)
async function deletePost(postId) {
  if (!accessToken) {
    alert("You must be logged in to delete this post.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}blog/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Post deleted successfully!");
      window.location.href = "/"; // Gå tilbake til forsiden etter sletting
    } else {
      throw new Error("Failed to delete post");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Could not delete post.");
  }
}
