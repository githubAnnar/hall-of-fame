import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RaceDataService } from 'src/app/core/race-data-service.service';
import { IPostRaceMessage } from 'src/app/shared/ipost-race-message.interface';
import { IRace } from 'src/app/shared/irace.interface';

@Component({
  selector: 'app-race-add',
  templateUrl: './race-add.component.html',
  styleUrls: ['./race-add.component.css']
})
export class RaceAddComponent implements OnInit {
  race: IRace = { Year: new Date().getFullYear(), Length: 10000, Id: 0 };
  postRaceMessage!: IPostRaceMessage;
  formRaceAdd!: FormGroup;

  constructor(private raceDataService: RaceDataService, private router: Router, private formBuilder: FormBuilder) {
    this.formRaceAdd = this.formBuilder.group({
      yearinput: this.formBuilder.control(this.race.Year, [Validators.required]),
      lengthinput: this.formBuilder.control(this.race.Length, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  send(): void {

    // Gather values
    this.race.Year = this.formRaceAdd.get("yearinput")?.value;
    this.race.Length = this.formRaceAdd.get("lengthinput")?.value;
    console.log(`Race Values: ${JSON.stringify(this.race)}`);

    const serverObserver = {
      next: (n: IPostRaceMessage) => {
        this.postRaceMessage = n;
        console.log(`Observer got new id: ${this.postRaceMessage.data.Id}`);
      },
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
        this.router.navigate(["/races"]);
      }
    };

    this.raceDataService.insertNewRace(this.race).subscribe(serverObserver);
  }

  isYearOk(): boolean {
    let bYear = !this.formRaceAdd.get('yearinput')?.errors?.required;
    console.log(`Year: ${bYear}`);
    return bYear;
  }

  isLengthOk(): boolean {
    let bLength = !this.formRaceAdd.get('lengthinput')?.errors?.required;
    console.log(`Lastname: ${bLength}`);
    return bLength;
  }
}
