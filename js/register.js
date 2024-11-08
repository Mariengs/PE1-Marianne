export async function register(email, password) {
  const regUrl = "https://v2.api.noroff.dev/api/v1/auth/register";
  const payload = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(regUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful:", data);
      alert("Registration successful. You can now log in.");
      window.location.href = "/index.html";
      return data;
    } else {
      console.log("Registraiton failed:", response.status);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

document
  .getElementById("registerform")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await login(email, password);
  });
