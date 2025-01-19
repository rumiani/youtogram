import * as cheerio from "cheerio";
import { currencyTypes } from "./isCurrency";

export default async function currencyRateHandler(c: currencyTypes) {
  console.log(c);
  
  const res = await fetch(
    `https://fa.navasan.net/dayRates.php?item=${c.urlName}`
  );
  const html = await res.text();
  const cheer = cheerio.load(html);
  const divText = cheer(`div.lastrate`).text();
  const spanText = cheer(`span#lastchange`).text();
  const divOnlyText = divText.replace(spanText, "").trim();
  console.log(spanText);
  const price = divOnlyText.trim();
  const lastchange = spanText.trim();
  const result = `- ${c.name1}\n Price: ${price} Tomans\n  Since yesterday: ${lastchange}\n  List:  /USD  /EUR  /GBP  /TRY  /JPY  /AED  /USDT  /BTC`;
  return result || "Something went wrong";
}
