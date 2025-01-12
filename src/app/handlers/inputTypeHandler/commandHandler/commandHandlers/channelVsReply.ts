import channelInfoHandler from "@/app/handlers/channelHandler/channelInfoHandler";
import { formatNumHandler } from "@/app/handlers/general/formatNumbers";
import _ from "lodash";

export default async function channelVsReply(commandArray: string[]) {    
  if (commandArray.length === 3) {
    const username1 = commandArray[1];
    const username2 = commandArray[2];

    const channelData1 = await channelInfoHandler(username1);
    const channelData2 = await channelInfoHandler(username2);

    if (
      channelData1.items &&
      channelData1.items.length > 0 &&
      channelData2.items &&
      channelData2.items.length > 0
    ) {
      const channel1Subs = channelData1.items[0].statistics.subscriberCount;
      const channel2Subs = channelData2.items[0].statistics.subscriberCount;
      const subDiff = Math.abs(channel1Subs - channel2Subs - 1000);
      return `
        The subscribers gap between <strong>${_.capitalize(username1)}</strong> and <strong>${_.capitalize(
        username2
      )}</strong> is:\n ${formatNumHandler(subDiff)}`;
    } else {
      return "Channel not found or API error.";
    }
  } else {
    return "Invalid input\n /help";
  }
}
