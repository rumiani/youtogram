import formatUsername from "../handlers";

export default async function getSubshandler(username: string) {
  const newUsername = formatUsername(username);
  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${newUsername}&key=${process.env.YOUTUBE_API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    if (searchData.items && searchData.items.length > 0) {
      const channelId = searchData.items[0].snippet.channelId;
      const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const channel = data.items[0];
        return `${newUsername}: ${channel.statistics.subscriberCount} subscribers`;
      }
    } else {
      return "Channel not found or API error.";
    }
  } catch (error) {
    console.log(error);
  }
}
