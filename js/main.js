import { renderPosts } from "./posts/renderPosts.js";

renderPosts();

window.logout = logout;

export function isLoggedIn() {
  return localStorage.getItem("accessToken") !== null;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  updateHeaderButtons();
  window.location.href = "/";
}

export function updateHeaderButtons() {
  const buttonsHeader = document.querySelector(".buttonsheader");

  if (isLoggedIn()) {
    buttonsHeader.innerHTML = `
      <button onclick="window.location.href='post/create.html'">Create New Post</button>
      <button onclick="logout()">Logout</button>
    `;
  } else {
    buttonsHeader.innerHTML = `
      <button onclick="window.location.href='account/login.html'">Login</button>
      <button onclick="window.location.href='account/register.html'">Register</button>
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
