/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Municipio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Municipio_nome_key" ON "Municipio"("nome");
