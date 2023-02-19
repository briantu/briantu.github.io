const USER_ID = "ctifmmtjxemj7oo6jussq32z5";
const getToken = async () => {
  const response = await fetch(
    "https://spotify-token-api.vercel.app/api/getToken"
  );
  const data = await response.json();
  return data.access_token;
};

export const getPlaylists = async () => {
  const token = await getToken();
  const response = await fetch(
    `https://api.spotify.com/v1/users/${USER_ID}/playlists?limit=50`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await response.json();
  let myPlaylists = data.items.filter(
    (playlist) => playlist.owner.id == USER_ID && playlist.public
  );
  console.log(myPlaylists);
  return myPlaylists;
};
