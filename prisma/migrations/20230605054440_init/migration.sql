/*
  Warnings:

  - You are about to drop the `assistsrecord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assisterId` to the `GoalsRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `assistsrecord` DROP FOREIGN KEY `AssistsRecord_matchId_fkey`;

-- DropForeignKey
ALTER TABLE `assistsrecord` DROP FOREIGN KEY `AssistsRecord_playerId_fkey`;

-- AlterTable
ALTER TABLE `goalsrecord` ADD COLUMN `assisterId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `assistsrecord`;

-- AddForeignKey
ALTER TABLE `GoalsRecord` ADD CONSTRAINT `GoalsRecord_assisterId_fkey` FOREIGN KEY (`assisterId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
