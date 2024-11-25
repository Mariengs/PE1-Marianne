import { BASE_URL } from "../constants/api.js";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}
const user = JSON.parse(localStorage.getItem("user"));
const name = user?.username || "defaultName";

export async function fetchAllPosts() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    console.error("No access token found. Please log in.");
    return [];
  }

  try {
    const response = await fetch(BASE_URL + `blog/posts/${name}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

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
