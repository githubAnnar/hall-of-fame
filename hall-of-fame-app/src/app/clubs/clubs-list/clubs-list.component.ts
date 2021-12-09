import { Component, Input, OnInit } from '@angular/core';
import { SorterService } from 'src/app/core/sorter-service.service';
import { IClubEx } from 'src/app/shared/iclub-ex.interface';

@Component({
  selector: 'app-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.css']
})
export class ClubsListComponent implements OnInit {
  private _clubs!: IClubEx[];

  @Input() get listClubs(): IClubEx[] {
    return this._clubs;
  }

  set listClubs(value: IClubEx[]) {
    if (value) {
      this.filteredClubs = this._clubs = value;
    }
  }

  filteredClubs: any[] = [];

  constructor(private sorterService: SorterService) { }

  ngOnInit(): void {
  }

  filter(data: string) {
    if (data) {
      this.filteredClubs = this.listClubs.filter((club: IClubEx) => {
        return club.Name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
          club.Updated.toString().indexOf(data) > -1;
      });
    } else {
      this.filteredClubs = this.listClubs;
    }
  }

  sort(prop: string) {
    this.sorterService.sort(this.filteredClubs, prop);
  }
}
