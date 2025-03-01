import prisma from "@/lib/prisma";
import { DirectionType, TrackingType } from "@prisma/client";
import userStoredData from "../../user/userStoredData/userStoredData";
import { allAssetsObjectsFromDB } from "../../assets/allAssetsObjectsFromDB/allAssetsObjectsFromDB";
import { startCase } from "lodash";

export async function updatUserAssetTracks(data: {
  code: string;
  percentage: string;
  userId: number;
  price: number;
}) {
  try {
    const userData = await userStoredData(data.userId.toString());
    if (!userData) return;
    const foundAssetTrack = userData.UserAssetTrack.find(
      (assetTrack) =>
        assetTrack.asset.code.toLowerCase() === data.code.toLowerCase()
    );

    if (foundAssetTrack) {
      await prisma.userAssetTrack.update({
        where: { id: foundAssetTrack.id },
        data: {
          threshold: +data.percentage,
          userId: userData.id,
          assetId: foundAssetTrack.asset.id,
          trackingType: TrackingType.PERCENTAGE_CHANGE,
          direction: DirectionType.INCREASE,
        },
      });

      return `${startCase(
        foundAssetTrack.asset.enName[0]
      )} has been updated and you will get a message when the change happens.\n/myassets\n /menu`;
    }
    const allAssets = await allAssetsObjectsFromDB();
    const asset = allAssets?.allAssets.find(
      (asset) => asset.code.toLowerCase() === data.code.toLowerCase()
    );
    await prisma.userAssetTrack.create({
      data: {
        threshold: +data.percentage,
        userId: userData.id,
        assetId: asset!.id,
        trackingType: TrackingType.PERCENTAGE_CHANGE,
        direction: DirectionType.INCREASE,
      },
    });
    return `${startCase(
      asset!.enName[0]
    )} has been saved for ${+data.percentage}% change and you will get a message when the change happens.\n/myassets\n/menu`;
  } catch {
    return "Something went wrong. /menu";
  }
}
