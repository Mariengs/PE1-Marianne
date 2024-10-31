import { BASE_URL } from "../constants/api.js";
const postUrl = `${BASE_URL}blog/posts/${id}`;

export async function fetchPostById(id) {
  try {
    const response = await fetch(postUrl);
    if (!response.ok) {
      throw new Error("Something went wrong fetching post");
    }
    const post = await response.json();
    return post;
  } catch (error) {
    console.error("Something went wrong", error);
  }
}

fetchPostById(id);
