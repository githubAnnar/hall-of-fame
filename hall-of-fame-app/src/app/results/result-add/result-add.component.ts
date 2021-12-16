import { Component, OnInit } from '@angular/core';
import { PartialObserver } from 'rxjs';
import { ClubDataService } from 'src/app/core/club-data-service.service';
import { PersonDataService } from 'src/app/core/person-data-service.service';
import { RaceDataService } from 'src/app/core/race-data-service.service';
import { IClubRevision } from 'src/app/shared/iclub-revision.interface';
import { IGetClubRevisionsMessage } from 'src/app/shared/iget-club-revisions-message.interface';
import { IGetPersonRevisionsMessage } from 'src/app/shared/iget-person-revisions-message.interface';
import { IGetRacesMessage } from 'src/app/shared/iget-races-message.interfaces';
import { IPersonRevision } from 'src/app/shared/iperson-revision.interface';
import { IRace } from 'src/app/shared/irace.interface';
import { IResult } from 'src/app/shared/iresult.interface';

@Component({
  selector: 'app-result-add',
  templateUrl: './result-add.component.html',
  styleUrls: ['./result-add.component.css']
})
export class ResultAddComponent implements OnInit {

  racesGetMessage!: IGetRacesMessage;
  personRevisionsGetMessage!: IGetPersonRevisionsMessage;
  clubRevisionsGetMessage!: IGetClubRevisionsMessage;
  allRaces!: IRace[];
  allPersonRevisions!: IPersonRevision[];
  allClubRevisions!: IClubRevision[];

  selectedRace!: IRace;
  selectedPersonRevision!:IPersonRevision;
  selectedClubRevision!: IClubRevision;

  submitted = false;

  constructor(private raceDataService: RaceDataService, private personDataService: PersonDataService, private clubDataService: ClubDataService) { }

  ngOnInit(): void {
    // Get all races
    const getRacesObserver = {
      next: (m: IGetRacesMessage) => {
        console.log(`Observer got ${m.message} for GET Races`);
        this.racesGetMessage = m;
      },
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
        this.allRaces = this.racesGetMessage.data;
      }
    };
    this.raceDataService.getAllRaces().subscribe(getRacesObserver);

    // Get All Persons and Revisions
    const getPersonRevisionsObserver = {
      next: (m: IGetPersonRevisionsMessage) => {
        console.log(`Observer got ${m.message} for GET PersonRevisions`);
        this.personRevisionsGetMessage = m;
      },
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
        this.allPersonRevisions = this.personRevisionsGetMessage.data;
      }
    };
    this.personDataService.getAllPersonRevisions().subscribe(getPersonRevisionsObserver);

    // Get All Club revisions
    const getClubRevisionsObserver:PartialObserver<IGetClubRevisionsMessage> = {
      next: (m: IGetClubRevisionsMessage) => {
        console.log(`Observer got ${m.message} for GET ClubRevisions`);
        this.clubRevisionsGetMessage = m;
      },
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
        this.allClubRevisions = this.clubRevisionsGetMessage.data;
      }
    };
    this.clubDataService.getAllClubRevisions().subscribe(getClubRevisionsObserver);
  }

  onSubmit() {
    this.submitted = !this.submitted;
  }
}
