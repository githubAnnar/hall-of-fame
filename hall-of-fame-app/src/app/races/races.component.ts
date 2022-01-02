import { Component, OnInit } from '@angular/core';
import { RaceDataService } from '../core/race-data-service.service';
import { TokenStorageService } from '../core/token-storage.service';
import { IGetRacesMessage } from '../shared/iget-races-message.interfaces';
import { IRace } from '../shared/irace.interface';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  title!: string;
  getRacesMessage!: IGetRacesMessage;
  races!: IRace[];

  constructor(private raceDataService: RaceDataService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    if (!this.tokenService.getToken()) {
      window.location.href = "login";
    }

    this.title = "Races";

    const getRacesObserver = {
      next: (m: IGetRacesMessage) => {
        console.log(`getRacesObserver got ${m.data.length} values: ${m.message}`);
        this.getRacesMessage = m;
      },
      error: (err: string) => console.error(`getRacesObserver got an error: ${err}`),
      complete: () => {
        console.log('getRacesObserver got a complete notification');
        this.races = this.getRacesMessage.data;
      }
    };

    this.raceDataService.getAllRaces().subscribe(getRacesObserver);
  }
}
