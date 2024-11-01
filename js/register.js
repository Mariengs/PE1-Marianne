import { registerUrl } from "./constants/api.js";

export async function registerUser(username, email, password = "") {
  const userData = {
    username: username,
    email: email,
    password: password,
  };

  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    console.log("Registration successful:", data);

    return data; // Returnerer data hvis registreringen er vellykket
  } catch (error) {
    console.error("Something went wrong during registration:", error);
  }
}

// Eksempel på å bruke funksjonen
registerUser("username", "johndoe@example.com", "securePassword123");
