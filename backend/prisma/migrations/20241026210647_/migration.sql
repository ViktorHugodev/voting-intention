/*
  Warnings:

  - A unique constraint covering the columns `[sigla]` on the table `Estado` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sigla` to the `Estado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estado" ADD COLUMN     "sigla" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Estado_sigla_key" ON "Estado"("sigla");
