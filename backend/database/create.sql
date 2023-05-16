CREATE TABLE "note" (
	"id"	INTEGER NOT NULL,
	"title"	TEXT NOT NULL,
	"author"	TEXT NOT NULL,
	"category"	TEXT NOT NULL,
	"content"	TEXT NOT NULL,
	"comment"	TEXT NOT NULL,
	"upload_user" TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "user" (
	"id"	INTEGER NOT NULL,
	"username"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"password_salt"	TEXT NOT NULL,
	"nickname"	TEXT NOT NULL,
	"disabled"	INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("id" AUTOINCREMENT)
);