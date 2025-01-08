import _ from "lodash";
import usernameToId from "./usernameToId";
import { formatNumHandler } from "../general/formatNumbers";
export default async function channelInfoHandler(username: string | null) {
  if (!username) return "Channel not found or API error.";
  try {
    const channelId = await usernameToId(username);
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const channel = data.items[0];
      return `
        ${_.capitalize(username)}\nViews: ${
          formatNumHandler(channel.statistics.viewCount)
      }\nSubscribers: ${formatNumHandler(channel.statistics.subscriberCount)}`;
    } else {
      return "Channel not found or API error.";
    }
  } catch (error) {
    console.log(error);
  }
}
