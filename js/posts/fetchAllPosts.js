import { BASE_URL } from "../constants/api.js";

const PUBLIC_USER = "mareng";

export async function fetchAllPosts(name = PUBLIC_USER) {
  try {
    const response = await fetch(`${BASE_URL}blog/posts/${name}`);

    if (!response.ok) throw new Error("Failed to fetch posts");

    const result = await response.json();

    if (result && result.data) {
      return result.data;
    } else {
      console.error("API response does not contain 'data'!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
