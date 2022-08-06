/*
  Warnings:

  - A unique constraint covering the columns `[name,tag,repository]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Image_name_tag_repository_key" ON "Image"("name", "tag", "repository");
