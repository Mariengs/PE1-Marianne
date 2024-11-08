document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://v2.api.noroff.dev/blog/posts";
  const token = localStorage.getItem("authToken");

  // Hent innlegg-ID fra URL-en
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  async function loadPost(postId) {
    try {
      const response = await fetch(`${apiUrl}/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const post = await response.json();

      document.getElementById("title").value = post.title;
      document.getElementById("body").value = post.body;
      document.getElementById("image").value = post.image || ""; // Legg til bilde-URL om den finnes
    } catch (error) {
      console.error("Feil ved lasting av innlegget:", error);
    }
  }

  // Last innlegg på redigeringssiden
  loadPost(postId);

  // Oppdater innlegg ved innsending av skjema
  document
    .getElementById("editForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const title = document.getElementById("title").value.trim();
      const body = document.getElementById("body").value.trim();
      const image = document.getElementById("image").value.trim();

      try {
        const response = await fetch(`${apiUrl}/${postId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body, image }),
        });

        if (response.ok) {
          alert("Innlegget ble oppdatert.");
          window.location.href = "/index.html";
        } else {
          alert("Kunne ikke oppdatere innlegget.");
        }
      } catch (error) {
        console.error("Feil ved oppdatering:", error);
      }
    });

  // Slett innlegg ved knappetrykk
  document
    .getElementById("deleteButton")
    .addEventListener("click", async function () {
      const confirmDelete = confirm(
        "Er du sikker på at du vil slette innlegget?"
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(`${apiUrl}/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Innlegget ble slettet.");
          window.location.href = "/index.html";
        } else {
          alert("Kunne ikke slette innlegget.");
        }
      } catch (error) {
        console.error("Feil ved sletting:", error);
      }
    });
});
