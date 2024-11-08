export async function login(email, password) {
  const url = "https://v2.api.noroff.dev/auth/login";
  const payload = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      alert("Login successful. You can now edit posts.");
      window.location.href = "/index.html";
      return data;
    } else {
      console.log("Login failed:", response.status);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await login(email, password);
  });
