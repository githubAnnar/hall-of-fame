CREATE TABLE "PersonRevision" (
	"Id"	INTEGER NOT NULL,
	"PersonId"	INTEGER NOT NULL,
	"Firstname"	TEXT NOT NULL,
	"Lastname"	TEXT NOT NULL,
	"Updated"	TEXT,
	"Gender"	INTEGER NOT NULL,
	PRIMARY KEY("Id" AUTOINCREMENT),
	FOREIGN KEY("PersonId") REFERENCES "Person"("Id")
)