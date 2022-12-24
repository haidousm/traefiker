-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_containerInfoId_fkey";

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "containerInfoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_containerInfoId_fkey" FOREIGN KEY ("containerInfoId") REFERENCES "ContainerInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
