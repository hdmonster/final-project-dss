-- AlterTable
ALTER TABLE `match` MODIFY `winnerId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_winnerId_fkey` FOREIGN KEY (`winnerId`) REFERENCES `Club`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
