-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,
    "status_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Book_author_id_idx" ON "Book"("author_id");

-- CreateIndex
CREATE INDEX "Book_language_id_idx" ON "Book"("language_id");

-- CreateIndex
CREATE INDEX "Book_status_id_idx" ON "Book"("status_id");

-- CreateIndex
CREATE INDEX "Book_user_id_idx" ON "Book"("user_id");

-- CreateIndex
CREATE INDEX "Author_user_id_idx" ON "Author"("user_id");
