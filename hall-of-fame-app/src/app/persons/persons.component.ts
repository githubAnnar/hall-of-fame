import { Component, OnInit } from '@angular/core';
import { PersonDataService } from '../core/person-data-service.service';
import { IGetPersonsMessage } from '../shared/iget-persons-message.interface';
import { IPersonEx } from '../shared/iperson-ex.interface';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  title!: string;
  getPersonsMessage!: IGetPersonsMessage;
  persons!: IPersonEx[];

  constructor(private personDataService: PersonDataService) { }

  ngOnInit(): void {
    console.log("Inside PersonsComponent");
    this.title = "Persons";

    const getPersonsObserver = {
      next: (m: IGetPersonsMessage) => {
        console.log(`getPersonsObserver got ${m.data.length} values: ${m.message}`);
        this.getPersonsMessage = m;
      },
      error: (err: string) => console.error(`getPersonsObserver got an error: ${err}`),
      complete: () => {
        console.log('getPersonsObserver got a complete notification');
        this.persons = this.getPersonsMessage.data;
      }
    };

    this.personDataService.getAllPersons().subscribe(getPersonsObserver);
  }

}
