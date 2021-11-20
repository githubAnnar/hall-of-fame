CREATE TABLE "Result" (
	"Id"	INTEGER NOT NULL,
	"RaceId"	INTEGER NOT NULL,
	"PersonRevisionId"	INTEGER NOT NULL,
	"ClubRevisionId"	INTEGER,
	"Time"	REAL NOT NULL,
	FOREIGN KEY("PersonRevisionId") REFERENCES "PersonRevision"("Id"),
	UNIQUE("RaceId","PersonRevisionId"),
	PRIMARY KEY("Id" AUTOINCREMENT),
	FOREIGN KEY("RaceId") REFERENCES "Race"("Id"),
	FOREIGN KEY("ClubRevisionId") REFERENCES "ClubRevision"("Id")
)