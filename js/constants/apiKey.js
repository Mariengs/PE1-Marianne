const options = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": "ab1a9411-db4e-453f-8f33-9251dfcbecbe",
  },
};

const response = await fetch(`${NOROFF_API_URL}/social/posts`, options);
const data = await response.json();
