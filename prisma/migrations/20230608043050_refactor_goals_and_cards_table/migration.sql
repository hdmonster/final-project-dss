/*
  Warnings:

  - You are about to drop the column `playerId` on the `cardsrecord` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `goalsrecord` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `CardsRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scorerId` to the `GoalsRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cardsrecord` DROP FOREIGN KEY `CardsRecord_playerId_fkey`;

-- DropForeignKey
ALTER TABLE `goalsrecord` DROP FOREIGN KEY `GoalsRecord_playerId_fkey`;

-- AlterTable
ALTER TABLE `cardsrecord` DROP COLUMN `playerId`,
    ADD COLUMN `receiverId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `goalsrecord` DROP COLUMN `playerId`,
    ADD COLUMN `scorerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `GoalsRecord` ADD CONSTRAINT `GoalsRecord_scorerId_fkey` FOREIGN KEY (`scorerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardsRecord` ADD CONSTRAINT `CardsRecord_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
