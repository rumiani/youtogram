import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

const chromiumPack = "./public/assets/chromium-v126.0.0-pack.tar"
export default async function getSubshandler(username: string) {
  function formatUsername(username: string) {
    return username
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .replace(/[^a-z0-9_]/g, ""); // Remove non-alphanumeric characters except underscores
  }
  const newUsername = formatUsername(username);
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      // See https://www.npmjs.com/package/@sparticuz/chromium#running-locally--headlessheadful-mode for local executable path 
      executablePath: await chromium.executablePath(chromiumPack),
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(`https://www.youtube.com/@${newUsername}`);
    const subscribersData = await page.evaluate(() => {
      // Find the span element that contains "subscribers"
      const spanElement = Array.from(document.querySelectorAll("span")).find(
        (el) => el.textContent!.includes("subscribers")
      );

      return spanElement ? spanElement.textContent!.trim() : null;
    });
    await browser.close();
    return subscribersData
      ? `${newUsername}: ${subscribersData}`
      : "Channel not found!";
  } catch (error) {
    console.error(error);
  }
}
