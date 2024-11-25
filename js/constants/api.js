export const BASE_URL = "https://v2.api.noroff.dev/";
export const registerUrl = BASE_URL + "auth/register";
export const accessToken = localStorage.getItem("accessToken");
// const name = JSON.parse(localStorage.getItem("user")).username;

export async function fetchPosts() {
  const response = await fetch();
  if (!response.ok) throw new Error("Could not fetch blog posts.");
  return await response.json();
}

export async function fetchPostById(id) {
  const response = await fetch(`${BASE_URL}blog/posts/${name}/${id}`);
  if (!response.ok)
    throw new Error(`Could not fetch blog post with ID: ${id}.`);
  return await response.json();
}

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Could not log in.");
  return await response.json();
}
