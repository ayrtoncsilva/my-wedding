-- CreateTable
CREATE TABLE "Presente" (
    "id" TEXT NOT NULL,
    "guest_name" TEXT NOT NULL,
    "present_description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Presente_pkey" PRIMARY KEY ("id")
);
