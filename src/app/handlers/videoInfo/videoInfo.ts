import { formatNumHandler } from "../general/formatNumbers";
import extractVideoIdHandler from "./extractVideoId";

export default async function videoInfoHandler(link: string) {
  const VIDEO_ID = await extractVideoIdHandler(link);
  if (!VIDEO_ID) return "Video not found.";

  try {
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${VIDEO_ID}&key=${process.env.YOUTUBE_API_KEY}`;
    const videoResponse = await fetch(videoUrl);
    const videoData = await videoResponse.json();
    if (videoData.items && videoData.items.length > 0) {
      const video = videoData.items[0];
      console.log(video);

      const { snippet, statistics } = video;
      const channelLink = `[Channel Link](https://www.youtube.com/channel/${snippet.channelId})`;
      return `${channelLink}
      \nVideo Title: ${snippet.title}\nViews: ${formatNumHandler(
        statistics.viewCount
      )}\nLikes: ${formatNumHandler(
        statistics.likeCount
      )}\nComments: ${formatNumHandler(statistics.commentCount)}`;
    } else {
      return "Video not found.";
    }
  } catch (error) {
    console.log(error);
  }
}