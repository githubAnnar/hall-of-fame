import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonDataService } from 'src/app/core/person-data-service.service';
import { ResultDataService } from 'src/app/core/result-data-service.service';
import { IGetPersonMessage } from 'src/app/shared/iget-person-message.interface';
import { IGetPersonRevisionsMessage } from 'src/app/shared/iget-person-revisions-message.interface';
import { IGetResultsExMessage } from 'src/app/shared/iget-results-ex-message.interface';
import { IPersonEx } from 'src/app/shared/iperson-ex.interface';
import { IPersonRevision } from 'src/app/shared/iperson-revision.interface';
import { IResultEx } from 'src/app/shared/iresult-ex.interface';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  title!: string;

  person: IPersonEx = { Id: 0, Updated: new Date().getFullYear(), Firstname: "No Firstname", Lastname: "No Lastname", Gender: 1 };
  getPersonMessage!: IGetPersonMessage;

  results!: IResultEx[];
  getResultsMessage!: IGetResultsExMessage;

  personRevisions!: IPersonRevision[];
  getPersonRevisionsMessage!: IGetPersonRevisionsMessage;

  constructor(private personDataService: PersonDataService, private resultDataService: ResultDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.title = "Person";
    let id: string | null = this.route.snapshot.paramMap.get('id');

    let idSelected = 0;
    if (id) {
      idSelected = +id;
    }

    // Get Person
    // Create observer object
    const personGetObserver = {
      next: (m: IGetPersonMessage) => {
        console.log(`Person Observer got: ${m.message}`);
        this.getPersonMessage = m;
      },
      error: (err: string) => console.error('Person Observer got an error: ' + err),
      complete: () => {
        this.person = this.getPersonMessage.data;
        this.title = `Person: ${this.person.Firstname} ${this.person.Lastname}`;
        console.log(`Person Observer got a complete notification for ${this.title}`);
      }
    };

    this.personDataService.getPersonById(idSelected).subscribe(personGetObserver);

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

    this.resultDataService.getResultsByPersonIdEx(idSelected).subscribe(resultsGetObserver);

    // Get Person Revisions
    const personRevisionsGetObserver = {
      next: (m: IGetPersonRevisionsMessage) => {
        console.log(`PersonRevisions Observer got: ${m.message}`);
        this.getPersonRevisionsMessage = m;
      },
      error: (err: string) => { console.error(`PersonRevisions Observer got an error: ${err}`) },
      complete: () => {
        this.personRevisions = this.getPersonRevisionsMessage.data;
        console.log(`PersonRevisions Observer got a complete notification for ${this.results.length} order(s)`);
      }
    };

    this.personDataService.getPersonRevisionsById(idSelected).subscribe(personRevisionsGetObserver);
  }
}
