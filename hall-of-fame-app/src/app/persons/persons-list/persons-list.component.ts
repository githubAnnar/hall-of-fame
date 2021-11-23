import { Component, Input, OnInit } from '@angular/core';
import { SorterService } from 'src/app/core/sorter-service.service';
import { IPersonEx } from 'src/app/shared/iperson-ex-interface';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {
  private _persons!: IPersonEx[];

  @Input() get listPersons(): IPersonEx[] {
    return this._persons;
  }

  set listPersons(value: IPersonEx[]) {
    if (value) {
      this.filteredPersons = this._persons = value;
    }
  }

  filteredPersons: any[] = [];

  constructor(private sorterService: SorterService) { }

  ngOnInit(): void {
  }

  filter(data: string) {
    if (data) {
      this.filteredPersons = this.listPersons.filter((person: IPersonEx) => {
        return person.Firstname.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          person.Lastname.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          person.Updated.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    } else {
      this.filteredPersons = this.listPersons;
    }
  }

  sort(prop: string) {
    this.sorterService.sort(this.filteredPersons, prop);
  }
}
