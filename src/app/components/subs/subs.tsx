import * as cheerio from "cheerio";

export default async function priceHandler() {
  const res = await fetch(`https://www.tgju.org/`);
  const html = await res.text();
  const cheer = cheerio.load(html);
  const subs = cheer("li#l-price_dollar_rl > span > span.info-price").text();
  console.log("downloads", subs);
}
