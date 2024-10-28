/*
  Warnings:

  - You are about to drop the column `intencaoVoto` on the `Pesquisa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pesquisa" DROP COLUMN "intencaoVoto";

-- CreateTable
CREATE TABLE "Voto" (
    "id" SERIAL NOT NULL,
    "candidatoId" INTEGER NOT NULL,
    "percentual" DOUBLE PRECISION NOT NULL,
    "pesquisaId" INTEGER NOT NULL,

    CONSTRAINT "Voto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Voto" ADD CONSTRAINT "Voto_pesquisaId_fkey" FOREIGN KEY ("pesquisaId") REFERENCES "Pesquisa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
