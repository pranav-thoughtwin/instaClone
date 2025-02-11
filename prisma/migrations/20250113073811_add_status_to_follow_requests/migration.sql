-- CreateEnum
CREATE TYPE "FollowRequestStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- AlterTable
ALTER TABLE "FollowRequest" ADD COLUMN     "status" "FollowRequestStatus" NOT NULL DEFAULT 'pending';
