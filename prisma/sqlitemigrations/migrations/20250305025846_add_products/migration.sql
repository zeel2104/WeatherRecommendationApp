-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "temperature_range" JSONB NOT NULL,
    "image_url" TEXT NOT NULL
);
