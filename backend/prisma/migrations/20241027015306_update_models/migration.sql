-- DropIndex
DROP INDEX "State_name_key";

-- DropIndex
DROP INDEX "Survey_id_municipalityId_key";

-- AlterTable
ALTER TABLE "State" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "State_id_seq";

-- CreateTable
CREATE TABLE "Candidate" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
