import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RaceDataService } from 'src/app/core/race-data-service.service';
import { ResultDataService } from 'src/app/core/result-data-service.service';
import { IGetRaceMessage } from 'src/app/shared/iget-race-message.interface';
import { IGetResultsExMessage } from 'src/app/shared/iget-results-ex-message.interface';
import { IRace } from 'src/app/shared/irace.interface';
import { IResultEx } from 'src/app/shared/iresult-ex.interface';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {
  title!: string;

  race: IRace = { Id: 0, Length: 0, Year: 0 };
  getRaceMessage!: IGetRaceMessage;

  results!: IResultEx[];
  getResultsMessage!: IGetResultsExMessage;

  constructor(private raceDataService: RaceDataService, private resultDataService: ResultDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.title = "Race";
    let id: string | null = this.route.snapshot.paramMap.get('id');

    let idSelected = 0;
    if (id) {
      idSelected = +id;
    }

    // Get Race
    // Create observer object
    const raceGetObserver = {
      next: (m: IGetRaceMessage) => {
        console.log(`Race Observer got: ${m.message}`);
        this.getRaceMessage = m;
      },
      error: (err: string) => console.error('Race Observer got an error: ' + err),
      complete: () => {
        this.race = this.getRaceMessage.data;
        this.title = `Race: ${this.race.Year}`;
        console.log(`Race Observer got a complete notification for ${this.title}`);
      }
    };

    this.raceDataService.getRaceById(idSelected).subscribe(raceGetObserver);

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
    }

    this.resultDataService.getResultsByRaceIdEx(idSelected).subscribe(resultsGetObserver);
  }
}
