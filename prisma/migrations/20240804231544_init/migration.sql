/*
  Warnings:

  - You are about to drop the column `userId` on the `ShippingAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShippingAddress" DROP COLUMN "userId",
ADD COLUMN     "buildingName" TEXT,
ADD COLUMN     "floor" TEXT,
ADD COLUMN     "landmark" TEXT,
ADD COLUMN     "roomNo" TEXT;
