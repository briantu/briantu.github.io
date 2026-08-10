// The tracks are fetched, filtered, and trimmed server-side by the token API,
// so the browser just asks for the finished list. No access token ever reaches here.
const TOP_TRACKS_API = "https://spotify-token-api.vercel.app/api/top-tracks";

export const getTopTracks = async () => {
  const response = await fetch(TOP_TRACKS_API);
  if (!response.ok) {
    throw new Error(`Top tracks request failed with ${response.status}`);
  }
  const tracks = await response.json();
  return Array.isArray(tracks) ? tracks : [];
};
