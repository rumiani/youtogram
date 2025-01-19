// import ytdl from "ytdl-core";
import channelInfoHandler from "../channelHandler/channelInfoHandler";
import extractChannelIdHandler from "../channelHandler/extractChannelId ";
import currencyRateHandler from "../currencyRateHandler/currencyRateHandler";
import { isCurrency } from "../currencyRateHandler/isCurrency";
import linkDetector from "../linkDetector/linkDetector";
// import videoDl from "../videoHandler/videoDl";
import commandHandler from "./commandHandler/commandHandler";

export default async function inputTypeHandler(messageText: string) {
  const cleanedText = messageText.trim().toLowerCase();
  const currency = isCurrency(cleanedText);
  if (currency) return currencyRateHandler(currency);

  if (cleanedText.startsWith("/")) return commandHandler(cleanedText);
  const { isUrl, isChannel, isVideo } = linkDetector(cleanedText);
  if (!isUrl) {
    return "Error, this is not a url";
  }
  if (isVideo) {
    // return videoDl();
  }
  if (isChannel) {
    const channelId = extractChannelIdHandler(cleanedText);
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
