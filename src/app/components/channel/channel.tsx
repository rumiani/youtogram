import puppeteer from "puppeteer";

export default async function getSubshandler(username: string) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www.youtube.com/@${username}`);
    const subscribersData = await page.evaluate(() => {
      // Find the span element that contains "subscribers"
      const spanElement = Array.from(document.querySelectorAll("span")).find(
        (el) => el.textContent!.includes("subscribers")
      );

      return spanElement ? spanElement.textContent!.trim() : null;
    });
    await browser.close();
    return subscribersData
      ? `${username}: ${subscribersData}`
      : "Channel not found!";
  } catch (error) {
    console.error(error);
  }
}
