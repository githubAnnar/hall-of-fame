import { Component, OnInit } from '@angular/core';
import { ClubDataService } from '../core/club-data-service.service';
import { IClubEx } from '../shared/iclub-ex-interface';
import { IGetClubsMessage } from '../shared/iget-clubs-message-interface';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  title!: string;
  getClubsMessage!: IGetClubsMessage;
  clubs!: IClubEx[];

  constructor(private clubDataService: ClubDataService) { }

  ngOnInit(): void {
    console.log("Inside ClubsComponent");
    this.title = "Clubs";

    const getClubsObserver = {
      next: (m: IGetClubsMessage) => {
        console.log(`getClubsObserver got ${m.data.length} values: ${m.message}`);
        this.getClubsMessage = m;
      },
      error: (err: string) => console.error(`getClubsObserver got an error: ${err}`),
      complete: () => {
        console.log('getClubsObserver got a complete notification');
        this.clubs = this.getClubsMessage.data;
      }
    };

    this.clubDataService.getAllClubs().subscribe(getClubsObserver);
  }
}
