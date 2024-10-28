/*
  Warnings:

  - The primary key for the `Survey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id,municipalityId]` on the table `Survey` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_surveyId_fkey";

-- AlterTable
ALTER TABLE "Municipality" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Municipality_id_seq";

-- AlterTable
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Survey_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Survey_id_seq";

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "surveyId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Survey_id_municipalityId_key" ON "Survey"("id", "municipalityId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
