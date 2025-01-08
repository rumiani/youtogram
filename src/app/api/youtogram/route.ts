export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import inputTypeHandler from "@/app/handlers/inputTypeHandler/inputTypeHandler";
import { Bot, webhookCallback } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);

bot.command("start", (ctx) => {
  ctx.reply(`Hi ${ctx.from?.first_name},\nPlease send me a Youtube username.`);
});
bot.on("message:text", async (ctx) => {
  const result = await inputTypeHandler(ctx.message.text);
  await ctx.reply(result!);
});

export const POST = webhookCallback(bot, "std/http");
