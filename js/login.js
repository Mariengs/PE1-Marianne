import { logInUrl } from "./login.js";

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Forhindrer siden i å laste på nytt

    // Hent verdier fra skjemaet
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Bygg objektet som skal sendes til API-et
    const credentials = {
      email: username,
      password: password,
    };

    try {
      // Send POST-forespørsel til API-et
      const response = await fetch(logInUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      // Sjekk om forespørselen var vellykket
      if (response.ok) {
        const data = await response.json(); // Hent JSON-data fra responsen
        document.getElementById("loginMessage").innerText =
          "Logg inn vellykket!";

        // Du kan lagre tokenet (hvis returnert) for senere bruk
        localStorage.setItem("authToken", data.token);
        window.location.href = "index.html";
        // Gjør videre handlinger etter innlogging, f.eks. omdiriger til ny side
      } else {
        document.getElementById("loginMessage").innerText =
          "Feil brukernavn eller passord.";
      }
    } catch (error) {
      console.error("En feil oppstod:", error);
      document.getElementById("loginMessage").innerText =
        "En feil oppstod. Prøv igjen senere.";
    }
  });
