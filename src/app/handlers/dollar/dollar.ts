import * as cheerio from "cheerio";

export default async function dollarHandler() {
  const res = await fetch(`https://www.tgju.org/`);
  const html = await res.text();
  const cheer = cheerio.load(html);
  const dollar = cheer("li#l-price_dollar_rl > span > span.info-price").text();  
  return dollar || 'Something went wrong';
}
