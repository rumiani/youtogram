// import ytdl from "ytdl-core";
import ytdl from "@distube/ytdl-core";

import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const videoUrl = "https://www.youtube.com/watch?v=MPL0n5Pd8Js";
  console.log(req);

  try {
    console.log(videoUrl);
    // const info = await ytdl.getInfo(videoUrl);
    const info = await ytdl.getBasicInfo(videoUrl);

    console.log(info.formats);
    const writeStream = fs.createWriteStream("./downloaded_video.mp4");
    ytdl(videoUrl, {
      format: ytdl.chooseFormat(info.formats, { quality: "highest" }),
    }).pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("Download completed successfully!");
    });
    writeStream.on("error", (err) => {
      console.error("Error during download:", err);
    });
    return NextResponse.json("done");
  } catch (error) {
    console.error("Error downloading video:", error);
    return NextResponse.json("Failed to download video", {});
  }
};
