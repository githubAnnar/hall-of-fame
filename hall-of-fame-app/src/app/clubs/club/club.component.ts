import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubDataService } from 'src/app/core/club-data-service.service';
import { ResultDataService } from 'src/app/core/result-data-service.service';
import { IClubEx } from 'src/app/shared/iclub-ex.interface';
import { IClubRevision } from 'src/app/shared/iclub-revision.interface';
import { IGetClubMessage } from 'src/app/shared/iget-club-message.interface';
import { IGetClubRevisionsMessage } from 'src/app/shared/iget-club-revisions-message.interface';
import { IGetResultsExMessage } from 'src/app/shared/iget-results-ex-message.interface';
import { IResultEx } from 'src/app/shared/iresult-ex.interface';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  title!: string;

  club!: IClubEx;
  getClubMessage!: IGetClubMessage;

  results!: IResultEx[];
  getResultsMessage!: IGetResultsExMessage;

  clubRevisions!:IClubRevision[];
  getClubRevisionsMessage!:IGetClubRevisionsMessage;
  
  constructor(private clubDataService: ClubDataService, private resultDataService: ResultDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.title = "Club";
    let id: string | null = this.route.snapshot.paramMap.get('id');

    let idSelected = 0;
    if (id) {
      idSelected = +id;
    }

    // Get Race
    // Create observer object
    const clubGetObserver = {
      next: (m: IGetClubMessage) => {
        console.log(`Club Observer got: ${m.message}`);
        this.getClubMessage = m;
      },
      error: (err: string) => console.error('Club Observer got an error: ' + err),
      complete: () => {
        this.club = this.getClubMessage.data;
        this.title = `Club: ${this.club.Name}`;
        console.log(`Club Observer got a complete notification for ${this.title}`);
      }
    };

    this.clubDataService.getClubById(idSelected).subscribe(clubGetObserver);

    // Get Results
    // Get results observer
    const resultsGetObserver = {
      next: (m: IGetResultsExMessage) => {
        console.log(`Results Observer got: ${m.message}`);
        this.getResultsMessage = m;
      },
      error: (err: string) => { console.error(`Results Observer got an error: ${err}`) },
      complete: () => {
        this.results = this.getResultsMessage.data;
        console.log(`Results Observer got a complete notification for ${this.results.length} order(s)`);
      }
    };

    this.resultDataService.getResultsByClubIdEx(idSelected).subscribe(resultsGetObserver);

    // Get Club Revisions
    const clubRevisionsGetObserver={
      next: (m: IGetClubRevisionsMessage) => {
        console.log(`ClubRevisions Observer got: ${m.message}`);
        this.getClubRevisionsMessage = m;
      },
      error: (err: string) => { console.error(`ClubRevisions Observer got an error: ${err}`) },
      complete: () => {
        this.clubRevisions = this.getClubRevisionsMessage.data;
        console.log(`ClubRevisions Observer got a complete notification for ${this.results.length} order(s)`);
      }
    };

    this.clubDataService.getClubRevisionsById(idSelected).subscribe(clubRevisionsGetObserver);
  }
}