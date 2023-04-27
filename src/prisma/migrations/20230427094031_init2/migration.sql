/*
  Warnings:

  - You are about to drop the column `type` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the `TrajectorySegments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RouteToStopPoint` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stopPointStartId,stopPointEndId]` on the table `Trajectory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transportTypeId` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TrajectorySegments" DROP CONSTRAINT "TrajectorySegments_geolocationId_fkey";

-- DropForeignKey
ALTER TABLE "TrajectorySegments" DROP CONSTRAINT "TrajectorySegments_trajectoryId_fkey";

-- DropForeignKey
ALTER TABLE "_RouteToStopPoint" DROP CONSTRAINT "_RouteToStopPoint_A_fkey";

-- DropForeignKey
ALTER TABLE "_RouteToStopPoint" DROP CONSTRAINT "_RouteToStopPoint_B_fkey";

-- DropIndex
DROP INDEX "Trajectory_stopPointEndId_key";

-- DropIndex
DROP INDEX "Trajectory_stopPointStartId_key";

-- AlterTable
ALTER TABLE "Route" DROP COLUMN "type",
ADD COLUMN     "transportTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TransportType" ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "TrajectorySegments";

-- DropTable
DROP TABLE "_RouteToStopPoint";

-- CreateTable
CREATE TABLE "TrajectorySegment" (
    "id" SERIAL NOT NULL,
    "trajectoryId" INTEGER NOT NULL,
    "geolocationId" INTEGER NOT NULL,
    "previousId" INTEGER,
    "nextId" INTEGER,

    CONSTRAINT "TrajectorySegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrajectorySegment_geolocationId_key" ON "TrajectorySegment"("geolocationId");

-- CreateIndex
CREATE UNIQUE INDEX "TrajectorySegment_previousId_key" ON "TrajectorySegment"("previousId");

-- CreateIndex
CREATE UNIQUE INDEX "TrajectorySegment_nextId_key" ON "TrajectorySegment"("nextId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Trajectory_stopPointStartId_stopPointEndId_key" ON "Trajectory"("stopPointStartId", "stopPointEndId");

-- AddForeignKey
ALTER TABLE "TrajectorySegment" ADD CONSTRAINT "TrajectorySegment_trajectoryId_fkey" FOREIGN KEY ("trajectoryId") REFERENCES "Trajectory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrajectorySegment" ADD CONSTRAINT "TrajectorySegment_geolocationId_fkey" FOREIGN KEY ("geolocationId") REFERENCES "Geolocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrajectorySegment" ADD CONSTRAINT "TrajectorySegment_previousId_fkey" FOREIGN KEY ("previousId") REFERENCES "TrajectorySegment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrajectorySegment" ADD CONSTRAINT "TrajectorySegment_nextId_fkey" FOREIGN KEY ("nextId") REFERENCES "TrajectorySegment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_transportTypeId_fkey" FOREIGN KEY ("transportTypeId") REFERENCES "TransportType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
