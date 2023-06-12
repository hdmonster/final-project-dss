/*
  Warnings:

  - You are about to drop the column `match_duration` on the `match` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Club` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clubId,name]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matchDuration` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jerseyNumber` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `match` DROP COLUMN `match_duration`,
    ADD COLUMN `matchDuration` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `player` ADD COLUMN `jerseyNumber` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Club_name_key` ON `Club`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Player_clubId_name_key` ON `Player`(`clubId`, `name`);
