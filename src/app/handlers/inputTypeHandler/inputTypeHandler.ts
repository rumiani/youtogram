// import ytdl from "ytdl-core";
import channelInfoHandler from "../channelHandler/channelInfoHandler";
import extractChannelIdHandler from "../channelHandler/extractChannelId ";
import dollarHandler from "../dollar/dollar";
import linkDetector from "../linkDetector/linkDetector";
// import videoDl from "../videoHandler/videoDl";
import commandHandler from "./commandHandler/commandHandler";

export default async function inputTypeHandler(messageText: string) {
  if (messageText.startsWith("/")) return commandHandler(messageText);
  const { isUrl, isChannel, isVideo } = linkDetector(messageText);
  if (!isUrl) {
    if (
      messageText.toLowerCase() === "دلار" ||
      messageText.toLowerCase() === "dollar"
    ) {
      const dollarPrice = await dollarHandler();
      return `Dollar price is: ${dollarPrice} Rials`;
    }
  }
  if (isVideo) {
    // return videoDl();
  }
  if (isChannel) {
    const channelId = extractChannelIdHandler(messageText);
    return channelInfoHandler(channelId);
  }
  // if (isDownloadReq) {
  //   const downloadReqArray = input.split(" ");
  //   const videoUrl = downloadReqArray[1];
  //   const videoStream = ytdl(videoUrl, {
  //     quality: "highestvideo", // Request 1080p video
  //     filter: "videoandaudio",
  //   });
  //   return { video: videoStream };
  // }
}
