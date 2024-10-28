/*
  Warnings:

  - The primary key for the `Survey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Survey` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[surveyId,municipalityId]` on the table `Survey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `surveyId` to the `Survey` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `surveyId` on the `Vote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_surveyId_fkey";

-- AlterTable
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_pkey",
ADD COLUMN     "surveyId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Survey_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "surveyId",
ADD COLUMN     "surveyId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Survey_surveyId_municipalityId_key" ON "Survey"("surveyId", "municipalityId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
