/*
  Warnings:

  - Added the required column `productName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productSKU` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "productSKU" TEXT NOT NULL;
