import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonDataService } from 'src/app/core/person-data-service.service';
import { IPersonRevision } from 'src/app/shared/iperson-revision.interface';
import { IPostPersonRevisionMessage } from 'src/app/shared/ipost-person-revision-message.interface';

@Component({
  selector: 'app-person-revision-add',
  templateUrl: './person-revision-add.component.html',
  styleUrls: ['./person-revision-add.component.css']
})
export class PersonRevisionAddComponent implements OnInit {
  personRevision: IPersonRevision = { Id: 0, PersonId: 0, Firstname: "", Lastname: "", Updated: new Date().getFullYear(), Gender: 1 };
  postPersonRevisionMessage!: IPostPersonRevisionMessage;
  formPersonRevisionAdd!: FormGroup;

  constructor(private personDataService: PersonDataService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.formPersonRevisionAdd = this.formBuilder.group({
      personidinput: this.formBuilder.control(this.personRevision.PersonId),
      firstnameinput: this.formBuilder.control(this.personRevision.Firstname, [Validators.required]),
      lastnameinput: this.formBuilder.control(this.personRevision.Lastname, [Validators.required]),
      yearinput: this.formBuilder.control(this.personRevision.Updated, [Validators.required]),
      genderinput: this.formBuilder.control(this.personRevision.Gender, [Validators.required])
    });
  }

  ngOnInit(): void {
    console.log(this.personRevision)
    this.personRevision.PersonId = this.route.snapshot.params.personid;
    console.log(this.personRevision)
    this.formPersonRevisionAdd.controls['personidinput'].setValue(this.personRevision.PersonId);
  }

  send(): void {

    // Gather values
    this.personRevision.Firstname = this.formPersonRevisionAdd.get("firstnameinput")?.value;
    this.personRevision.Lastname = this.formPersonRevisionAdd.get("lastnameinput")?.value;
    this.personRevision.Gender = this.formPersonRevisionAdd.get("genderinput")?.value;
    console.log(`PersonRevision Values: ${JSON.stringify(this.personRevision)}`);

    const serverObserver = {
      next: (n: IPostPersonRevisionMessage) => {
        this.postPersonRevisionMessage = n;
        console.log(`Observer got new id: ${this.postPersonRevisionMessage.data.Id}`);
      },
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
        this.router.navigate([`/person/${this.postPersonRevisionMessage.data.PersonId}`]);
      }
    };

    this.personDataService.insertPersonRevisionById(this.personRevision).subscribe(serverObserver);
  }

  isFirstnameOk(): boolean {
    let bFirstname = !this.formPersonRevisionAdd.get('firstnameinput')?.errors?.required;
    console.log(`Firstname: ${bFirstname}`);
    return bFirstname;
  }

  isLastnameOk(): boolean {
    let bLastname = !this.formPersonRevisionAdd.get('lastnameinput')?.errors?.required;
    console.log(`Lastname: ${bLastname}`);
    return bLastname;
  }
}
