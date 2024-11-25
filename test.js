// test.js
import { BASE_URL } from "/js/constants/api.js";

// Hent tilgangstoken fra localStorage
const accessToken = localStorage.getItem("accessToken");

async function testAccessToken() {
  const response = await fetch(`${BASE_URL}blog/posts/<name>`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error("Unauthorized, please log in again.");
    alert("Your session has expired or you are not logged in.");
    window.location.href = "/account/login.html"; // Redirect to login if token is invalid
  } else {
    console.log("Access token is valid.");
  }
}

// Test token før du prøver å lage innlegg
testAccessToken();
