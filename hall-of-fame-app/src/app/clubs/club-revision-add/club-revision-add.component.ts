import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubDataService } from 'src/app/core/club-data-service.service';
import { IClubRevision } from 'src/app/shared/iclub-revision.interface';
import { IPostClubRevisionMessage } from 'src/app/shared/ipost-club-revision-message.interface';

@Component({
  selector: 'app-club-revision-add',
  templateUrl: './club-revision-add.component.html',
  styleUrls: ['./club-revision-add.component.css']
})
export class ClubRevisionAddComponent implements OnInit {
  clubRevision: IClubRevision = { Id: 0, ClubId: 0, Name: "", Updated: new Date().getFullYear() };
  postClubRevisionMessage!: IPostClubRevisionMessage;
  formClubRevisionAdd!: FormGroup;

  constructor(private clubDataService: ClubDataService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.formClubRevisionAdd = this.formBuilder.group({
      clubidinput: this.formBuilder.control(this.clubRevision.ClubId),
      nameinput: this.formBuilder.control(this.clubRevision.Name, [Validators.required]),
      yearinput: this.formBuilder.control(this.clubRevision.Updated, [Validators.required])
    });
  }
  ngOnInit(): void {
    console.log(this.clubRevision)
    this.clubRevision.ClubId = this.route.snapshot.params.clubid;
    console.log(this.clubRevision)
    this.formClubRevisionAdd.controls['clubidinput'].setValue(this.clubRevision.ClubId);
  }

  send(): void {

    // Gather values
    this.clubRevision.Name = this.formClubRevisionAdd.get("nameinput")?.value;
    console.log(`ClubRevision Values: ${JSON.stringify(this.clubRevision)}`);

    const serverObserver = {
      next: (n: IPostClubRevisionMessage) => {
        this.postClubRevisionMessage = n;
        console.log(`Observer got new id: ${this.postClubRevisionMessage.data.Id}`);
      },
      error: (err: string) => console.error('Observer got an error: ' + err),
      complete: () => {
        console.log('Observer got a complete notification');
        this.router.navigate([`/club/${this.postClubRevisionMessage.data.ClubId}`]);
      }
    };

    this.clubDataService.insertClubRevisionById(this.clubRevision).subscribe(serverObserver);
  }

  isNameOk(): boolean {
    let bName = !this.formClubRevisionAdd.get('nameinput')?.errors?.required;
    console.log(`Name: ${bName}`);
    return bName;
  }
}
