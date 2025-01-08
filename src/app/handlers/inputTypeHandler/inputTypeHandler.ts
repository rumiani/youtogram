import channelInfoHandler from "../channel/channel";
import extractChannelIdHandler from "../channel/extractChannelId ";
import dollarHandler from "../dollar/dollar";
import formatUsername from "../handlers";
import videoInfoHandler from "../videoInfo/videoInfo";

export default async function inputTypeHandler(input: string) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  const isUrl = urlRegex.test(input);
  const channelRegex = /(?:youtube\.com\/@(?!videos\/)([^\/\n\s?=]+))/;
  const isChannel = channelRegex.test(input);
  const videoRegex =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const isVideo = videoRegex.test(input);
  if (!isUrl) {
    if (input.toLowerCase() === "دلار" || input.toLowerCase() === "dollar") {
      const dollarPrice = await dollarHandler();
      return `Dollar price is: ${dollarPrice} Rial`;
    } else {
      const username = formatUsername(input);
      return channelInfoHandler(username);
    }
  }
  if (isVideo) {
    return videoInfoHandler(input);
  }
  if (isChannel) {
    const channelId = extractChannelIdHandler(input);
    return channelInfoHandler(channelId);
  }
}
