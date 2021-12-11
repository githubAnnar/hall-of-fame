import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonDataService } from 'src/app/core/person-data-service.service';
import { IPersonEx } from 'src/app/shared/iperson-ex.interface';
import { IPostPersonMessage } from 'src/app/shared/ipost-person-message.interface';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {
  person: IPersonEx = { Id: 0, Firstname: "", Lastname: "", Gender: 1, Updated: new Date().getFullYear() };
  postPersonMessage!: IPostPersonMessage;
  formPersonAdd!: FormGroup;

  constructor(private personDataService: PersonDataService, private router: Router, private formBuilder: FormBuilder) {
    this.formPersonAdd = this.formBuilder.group({
      firstnameinput: this.formBuilder.control(this.person.Firstname, [Validators.required]),
      lastnameinput: this.formBuilder.control(this.person.Lastname, [Validators.required]),
      yearinput: this.formBuilder.control(this.person.Updated, [Validators.required]),
      genderinput: this.formBuilder.control(this.person.Gender, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  send(): void {

    // Gather values
    this.person.Firstname = this.formPersonAdd.get("firstnameinput")?.value;
    this.person.Lastname = this.formPersonAdd.get("lastnameinput")?.value;
    this.person.Updated = this.formPersonAdd.get("yearinput")?.value;
    this.person.Gender = this.formPersonAdd.get("genderinput")?.value;
    console.log(`Person Values: ${JSON.stringify(this.person)}`);

    const serverObserver = {
      next: (n: IPostPersonMessage) => {
        this.postPersonMessage = n;
        console.log(`Observer got new id: ${this.postPersonMessage.data.Id}`);
      },
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
        this.router.navigate(["/Persons"]);
      }
    };

    this.personDataService.insertNewPerson(this.person).subscribe(serverObserver);
  }

  isYearOk(): boolean {
    let bYear = !this.formPersonAdd.get('yearinput')?.errors?.required;
    console.log(`Year: ${bYear}`);
    return bYear;
  }

  isFirstnameOk(): boolean {
    let bFirstname = !this.formPersonAdd.get('firstnameinput')?.errors?.required;
    console.log(`Firstname: ${bFirstname}`);
    return bFirstname;
  }

  isLastnameOk(): boolean {
    let bLastname = !this.formPersonAdd.get('lastnameinput')?.errors?.required;
    console.log(`Lastname: ${bLastname}`);
    return bLastname;
  }
}
