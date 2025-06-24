export async function getUserData(access_token) {
  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer${access_token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching user info ", error);
  }
}