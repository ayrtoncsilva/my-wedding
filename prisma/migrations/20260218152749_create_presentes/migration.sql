/*
  Warnings:

  - You are about to drop the `Presente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Presente";

-- CreateTable
CREATE TABLE "presentes" (
    "id" TEXT NOT NULL,
    "guest_name" TEXT NOT NULL,
    "present_description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "presentes_pkey" PRIMARY KEY ("id")
);
