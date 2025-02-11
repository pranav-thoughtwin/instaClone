/*
  Warnings:

  - You are about to drop the column `receiverID` on the `FollowRequest` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `FollowRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FollowRequest" DROP CONSTRAINT "FollowRequest_receiverID_fkey";

-- AlterTable
ALTER TABLE "FollowRequest" DROP COLUMN "receiverID",
ADD COLUMN     "receiverId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FollowRequest" ADD CONSTRAINT "FollowRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
