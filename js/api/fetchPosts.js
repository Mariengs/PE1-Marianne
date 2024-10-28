import { BASE_URL } from "./api.js";

async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/blog/posts/{name}`);
    if (!response.ok) {
      throw new Error("Couldn't load posts");
    }
    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

fetchPosts();
