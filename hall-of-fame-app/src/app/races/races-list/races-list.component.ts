import { Component, Input, OnInit } from '@angular/core';
import { SorterService } from 'src/app/core/sorter-service.service';
import { IRace } from 'src/app/shared/irace-interface';

@Component({
  selector: 'app-races-list',
  templateUrl: './races-list.component.html',
  styleUrls: ['./races-list.component.css']
})
export class RacesListComponent implements OnInit {
  private _races: IRace[] = [];

  @Input() get listRaces(): IRace[] {
    return this._races;
  }

  set listRaces(value: IRace[]) {
    if (value) {
      this.races = this._races = value;
    }
  }

  races: any[] = [];

  constructor(private sorterService: SorterService) { }

  ngOnInit(): void {
  }

  sort(prop: string) {
    this.sorterService.sort(this.races, prop);
  }
}
