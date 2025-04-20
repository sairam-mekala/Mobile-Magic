/*
  Warnings:

  - You are about to drop the column `Description` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;
