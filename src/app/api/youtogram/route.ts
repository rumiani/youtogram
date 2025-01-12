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
  if(result){
    await ctx.reply(result!, { parse_mode: "HTML" });
  }else{
    ctx.reply("Bad request, click /help", { parse_mode: "HTML" });
  }
});

export const POST = async (req: Request) => {
  // const isCronJob = req.headers.get("X-Request-Source") === "cronjob";
  const headers = req.headers
  const userAgent = headers.get('user-agent');
  const isCronJob = userAgent && userAgent.includes('cron-job.org');
  try {
    
    if (isCronJob) {
      // Handle the cronjob request logic here
      console.log("Received request from cronjob.");
      return new Response("Request from cronjob processed.", { status: 200 });
    } else {
      console.log("Received request from Telegram.");
      return webhookCallback(bot, "std/http")(req);
    }
  } catch (error) {
    console.log('Error: ',error);
    
  }
};
