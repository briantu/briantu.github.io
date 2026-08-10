// The playlists are fetched, filtered, and trimmed server-side by the token API,
// so the browser just asks for the finished list. No access token ever reaches here.
const PLAYLISTS_API = "https://spotify-token-api.vercel.app/api/playlists";

export const getPlaylists = async () => {
  const response = await fetch(PLAYLISTS_API);
  if (!response.ok) {
    throw new Error(`Playlists request failed with ${response.status}`);
  }
  const playlists = await response.json();
  return Array.isArray(playlists) ? playlists : [];
};
