-- CreateEnum
CREATE TYPE "StatusConfirmacao" AS ENUM ('sim', 'nao');

-- CreateTable
CREATE TABLE "confirmacoes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "status" "StatusConfirmacao" NOT NULL,
    "restricoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "confirmacoes_pkey" PRIMARY KEY ("id")
);
