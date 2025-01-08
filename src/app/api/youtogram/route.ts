export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import getSubshandler from "@/app/components/channel/channel";
import { Bot, webhookCallback } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);
bot.on("message:text", async (ctx) => {
  const result = await getSubshandler(ctx.message.text);
  await ctx.reply(result!);
});

export const POST = webhookCallback(bot, "std/http");
