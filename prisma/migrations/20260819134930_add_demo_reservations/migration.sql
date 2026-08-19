-- CreateTable
CREATE TABLE "DemoReservation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" TEXT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "programs" TEXT,
    "message" TEXT,
    "locale" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoReservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DemoReservation_date_idx" ON "DemoReservation"("date");

-- CreateIndex
CREATE UNIQUE INDEX "DemoReservation_date_time_key" ON "DemoReservation"("date", "time");
