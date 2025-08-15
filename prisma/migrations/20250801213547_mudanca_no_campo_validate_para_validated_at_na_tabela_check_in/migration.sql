/*
  Warnings:

  - You are about to drop the column `validate` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "validate",
ADD COLUMN     "validated_at" TIMESTAMP(3);
