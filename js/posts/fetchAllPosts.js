import { BASE_URL } from "../constants/api.js";
const endpoint = "blog/posts/<name>";
const postsURL = `${BASE_URL}${endpoint}`;

export async function fetchAllPosts() {
  try {
    const response = await fetch(postsURL);
    if (!response.ok) {
      throw new Error("Something went wrong fething posts");
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

fetchAllPosts();
