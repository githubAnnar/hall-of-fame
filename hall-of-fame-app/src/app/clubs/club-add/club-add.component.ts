import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubDataService } from 'src/app/core/club-data-service.service';
import { IClubEx } from 'src/app/shared/iclub-ex.interface';
import { IPostClubMessage } from 'src/app/shared/ipost-club-message.interface';

@Component({
  selector: 'app-club-add',
  templateUrl: './club-add.component.html',
  styleUrls: ['./club-add.component.css']
})
export class ClubAddComponent implements OnInit {
  club: IClubEx = { Id: 0, Name: "", Updated: new Date().getFullYear() };
  postClubMessage!: IPostClubMessage;
  formClubAdd!: FormGroup;

  constructor(private clubDataService: ClubDataService, private router: Router, private formBuilder: FormBuilder) {
    this.formClubAdd = this.formBuilder.group({
      nameinput: this.formBuilder.control(this.club.Name, [Validators.required]),
      yearinput: this.formBuilder.control(this.club.Updated, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  send(): void {

    // Gather values
    this.club.Name = this.formClubAdd.get("nameinput")?.value;
    this.club.Updated = this.formClubAdd.get("yearinput")?.value;
    console.log(`Club Values: ${JSON.stringify(this.club)}`);

    const serverObserver = {
      next: (n: IPostClubMessage) => {
        this.postClubMessage = n;
        console.log(`Observer got new id: ${this.postClubMessage.data.Id}`);
      },
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
        this.router.navigate(["/clubs"]);
      }
    };

    this.clubDataService.insertNewClub(this.club).subscribe(serverObserver);
  }

  isYearOk(): boolean {
    let bYear = !this.formClubAdd.get('yearinput')?.errors?.required;
    console.log(`Year: ${bYear}`);
    return bYear;
  }

  isNameOk(): boolean {
    let bName = !this.formClubAdd.get('nameinput')?.errors?.required;
    console.log(`Name: ${bName}`);
    return bName;
  }
}
