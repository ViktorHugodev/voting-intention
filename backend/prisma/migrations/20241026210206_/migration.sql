/*
  Warnings:

  - You are about to drop the column `populacao` on the `Municipio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Estado` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Municipio_nome_key";

-- AlterTable
ALTER TABLE "Municipio" DROP COLUMN "populacao";

-- CreateIndex
CREATE UNIQUE INDEX "Estado_nome_key" ON "Estado"("nome");
