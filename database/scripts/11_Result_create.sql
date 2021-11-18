CREATE TABLE "Result" (
	"Id"	INTEGER NOT NULL,
	"RaceId"	INTEGER NOT NULL,
	"PersonRevisionId"	INTEGER NOT NULL,
	"ClubId"	INTEGER,
	"Time"	REAL NOT NULL,
	FOREIGN KEY("PersonRevisionId") REFERENCES "PersonRevision"("Id"),
	UNIQUE("RaceId","PersonRevisionId"),
	PRIMARY KEY("Id" AUTOINCREMENT),
	FOREIGN KEY("RaceId") REFERENCES "Race"("Id"),
	FOREIGN KEY("ClubId") REFERENCES "ClubRevision"("Id")
)