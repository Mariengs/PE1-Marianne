import { registerUrl } from "../js/constants/api.js";

function getValues() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("All fields are required.");
    return null;
  }

  return { name, email, password };
}

function buildRequestBody({ name, email, password }) {
  return {
    name,
    email,
    password,
  };
}

async function registerUser(requestBody) {
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Something went wrong:", errorData);
      throw new Error(
        `Registration failed: ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();
    alert("Registration successful! Welcome!");
    window.location.href = "../index.html";
  } catch (error) {
    alert(`Something went wrong: ${error.message}`);
  }
}

document
  .getElementById("registerform")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const bodyValues = getValues();

    const requestBody = buildRequestBody(bodyValues);

    registerUser(requestBody);
  });
