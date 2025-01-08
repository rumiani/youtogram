import formatUsername from "../handlers";

export default async function usernameToId(username: string) {
  const newUsername = formatUsername(username);
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${newUsername}&key=${process.env.YOUTUBE_API_KEY}`;
  const searchResponse = await fetch(searchUrl);
  const searchData = await searchResponse.json();
  if (searchData.items && searchData.items.length > 0) {
    const channelId = searchData.items[0].snippet.channelId;
    return channelId;
  }
}
