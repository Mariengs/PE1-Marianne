import { BASE_URL } from "../constants/api.js";

// Funksjon for å hente innlegg basert på navn
export async function fetchPostByName(name) {
  const URL = `${BASE_URL}blog/posts/${name}`; // Bygger opp URL-en
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error("Something went wrong fetching the post");
  }

  const post = await response.json(); // Henter JSON-data
  return post; // Returnerer innlegget
}

// Kall funksjonen med et spesifikt postnavn
const postName = "post name"; // Erstatt med det faktiske navnet på innlegget
fetchPostByName(postName)
  .then((post) => {
    console.log(post); // Håndterer det hentede innlegget, f.eks. viser det i konsollen
  })
  .catch((error) => {
    console.error("Error fetching the post:", error); // Håndterer eventuelle feil
  });
