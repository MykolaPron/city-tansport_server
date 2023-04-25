-- CreateTable
CREATE TABLE "Geolocation" (
    "id" SERIAL NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Geolocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "geolocationId" INTEGER NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "geolocationId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StopPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "geolocationId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "StopPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteToStopPoint" (
    "stopPointId" INTEGER NOT NULL,
    "routeId" INTEGER NOT NULL,

    CONSTRAINT "RouteToStopPoint_pkey" PRIMARY KEY ("stopPointId","routeId")
);

-- CreateTable
CREATE TABLE "Trajectory" (
    "id" SERIAL NOT NULL,
    "stopPointStartId" INTEGER NOT NULL,
    "stopPointEndId" INTEGER NOT NULL,

    CONSTRAINT "Trajectory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrajectorySegments" (
    "trajectoryId" INTEGER NOT NULL,
    "geolocationId" INTEGER NOT NULL,

    CONSTRAINT "TrajectorySegments_pkey" PRIMARY KEY ("trajectoryId","geolocationId")
);

-- CreateTable
CREATE TABLE "TransportType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TransportType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RouteToStopPoint" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Region_geolocationId_key" ON "Region"("geolocationId");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_geolocationId_key" ON "City"("geolocationId");

-- CreateIndex
CREATE UNIQUE INDEX "StopPoint_name_key" ON "StopPoint"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StopPoint_geolocationId_key" ON "StopPoint"("geolocationId");

-- CreateIndex
CREATE UNIQUE INDEX "Route_name_key" ON "Route"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Trajectory_stopPointStartId_key" ON "Trajectory"("stopPointStartId");

-- CreateIndex
CREATE UNIQUE INDEX "Trajectory_stopPointEndId_key" ON "Trajectory"("stopPointEndId");

-- CreateIndex
CREATE UNIQUE INDEX "TrajectorySegments_trajectoryId_geolocationId_key" ON "TrajectorySegments"("trajectoryId", "geolocationId");

-- CreateIndex
CREATE UNIQUE INDEX "TransportType_name_key" ON "TransportType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RouteToStopPoint_AB_unique" ON "_RouteToStopPoint"("A", "B");

-- CreateIndex
CREATE INDEX "_RouteToStopPoint_B_index" ON "_RouteToStopPoint"("B");

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_geolocationId_fkey" FOREIGN KEY ("geolocationId") REFERENCES "Geolocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_geolocationId_fkey" FOREIGN KEY ("geolocationId") REFERENCES "Geolocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StopPoint" ADD CONSTRAINT "StopPoint_geolocationId_fkey" FOREIGN KEY ("geolocationId") REFERENCES "Geolocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StopPoint" ADD CONSTRAINT "StopPoint_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteToStopPoint" ADD CONSTRAINT "RouteToStopPoint_stopPointId_fkey" FOREIGN KEY ("stopPointId") REFERENCES "StopPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteToStopPoint" ADD CONSTRAINT "RouteToStopPoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trajectory" ADD CONSTRAINT "Trajectory_stopPointStartId_fkey" FOREIGN KEY ("stopPointStartId") REFERENCES "StopPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trajectory" ADD CONSTRAINT "Trajectory_stopPointEndId_fkey" FOREIGN KEY ("stopPointEndId") REFERENCES "StopPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrajectorySegments" ADD CONSTRAINT "TrajectorySegments_trajectoryId_fkey" FOREIGN KEY ("trajectoryId") REFERENCES "Trajectory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrajectorySegments" ADD CONSTRAINT "TrajectorySegments_geolocationId_fkey" FOREIGN KEY ("geolocationId") REFERENCES "Geolocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RouteToStopPoint" ADD CONSTRAINT "_RouteToStopPoint_A_fkey" FOREIGN KEY ("A") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RouteToStopPoint" ADD CONSTRAINT "_RouteToStopPoint_B_fkey" FOREIGN KEY ("B") REFERENCES "StopPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
