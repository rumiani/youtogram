import channelVsReply from "./commandHandlers/channelVsReply";
import channelInfoReply from "./commandHandlers/channelInfoReply";

export default async function commandHandler(messageText: string) {
  type CommandHandler = (args: string[]) => string | Promise<string>;
  const commandReplies: Record<string, CommandHandler> = {
    "/info": (args: string[]) => channelInfoReply(args),
    "/vs": (args: string[]) => channelVsReply(args),
    "/top": () => "Fetching the top YouTube channels...",
    "/list": () => "Here are your favorite YouTube channels: ...",
    "/help": () =>
      `Available commands:\n1- Compare two channels with usernames:\n\/vs channel1username channel2username\n2- Check out channel info:\n/info channelUsername`,
  };
  const commandArray = messageText.split(" ");
  const handler = commandReplies[commandArray[0]];
  if (handler) {
    return await handler(commandArray);
  } else {
    return await channelInfoReply(["/info", messageText]);
  }
}
