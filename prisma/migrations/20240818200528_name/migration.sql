/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "churrascariaId" INTEGER,
    "mercadoId" INTEGER,
    CONSTRAINT "Endereco_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Endereco_churrascariaId_fkey" FOREIGN KEY ("churrascariaId") REFERENCES "Churrascaria" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Endereco_mercadoId_fkey" FOREIGN KEY ("mercadoId") REFERENCES "Mercado" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Churrascaria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "rating" REAL,
    "phoneNumber" TEXT,
    "website" TEXT
);

-- CreateTable
CREATE TABLE "Mercado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "openingHours" TEXT,
    "phoneNumber" TEXT,
    "fazEntregas" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Carne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "marketId" INTEGER NOT NULL,
    CONSTRAINT "Carne_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Mercado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KitDeChurrasco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password") SELECT "email", "id", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
