import { Component, OnInit } from '@angular/core';
import { ResultDataService } from '../core/result-data-service.service';
import { IGetResultsExMessage } from '../shared/iget-results-ex-message.interface';
import { IResultEx } from '../shared/iresult-ex.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  title!: string;
  getResultsMessage!: IGetResultsExMessage;
  results!: IResultEx[];

  constructor(private resultDataService: ResultDataService) { }

  ngOnInit(): void {
    console.log("Inside ResultsComponent");
    this.title = "Results";

    const getResultsObserver = {
      next: (m: IGetResultsExMessage) => {
        console.log(`getResultsObserver got ${m.data.length} values: ${m.message}`);
        this.getResultsMessage = m;
      },
      error: (err: string) => console.error(`getResultsObserver got an error: ${err}`),
      complete: () => {
        console.log('getResultsObserver got a complete notification');
        this.results = this.getResultsMessage.data;
      }
    };

    this.resultDataService.getAllResultsEx().subscribe(getResultsObserver);
  }

}
