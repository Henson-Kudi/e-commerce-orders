/*
  Warnings:

  - You are about to drop the column `shippingAddressId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `ShippingAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `ShippingAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingAddressId";

-- AlterTable
ALTER TABLE "ShippingAddress" ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShippingAddress_orderId_key" ON "ShippingAddress"("orderId");

-- AddForeignKey
ALTER TABLE "ShippingAddress" ADD CONSTRAINT "ShippingAddress_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
