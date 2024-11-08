// Sjekk om brukeren er logget inn
function isLoggedIn() {
  return !!localStorage.getItem("authToken");
}

async function loadPost(postId) {
  if (!isLoggedIn()) {
    alert("You must be logged in to edit a post.");
    return;
  }

  try {
    const response = await fetch(`https://api.example.com/posts/${postId}`);
    const post = await response.json();

    document.getElementById("title").value = post.title;
    document.getElementById("body").value = post.body;
    document.getElementById("image").value = post.image;
  } catch (error) {
    console.error("Could not load post:", error);
  }
}

async function deletePost(postId) {
  if (!isLoggedIn()) {
    alert("You must be logged in to delete a post.");
    return;
  }

  try {
    const response = await fetch(`https://api.example.com/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      alert("Post deleted successfully.");
      window.location.href = "/index.html"; // Gå tilbake til hovedsiden
    } else {
      alert("Could not delete post.");
    }
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
}

document
  .getElementById("editForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const body = document.getElementById("body").value.trim();
    const image = document.getElementById("image").value.trim();

    if (!title || !body) {
      alert("Title and content are required.");
      return;
    }

    try {
      const response = await fetch(`https://api.example.com/posts/${postId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, image }),
      });

      if (response.ok) {
        alert("Post updated successfully.");
        window.location.reload(); // Oppdater siden
      } else {
        alert("Could not update post.");
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  });
