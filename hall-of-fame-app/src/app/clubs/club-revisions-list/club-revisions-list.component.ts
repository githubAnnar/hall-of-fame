import { Component, Input, OnInit } from '@angular/core';
import { SorterService } from 'src/app/core/sorter-service.service';
import { IClubRevision } from 'src/app/shared/iclub-revision.interface';

@Component({
  selector: 'app-club-revisions-list',
  templateUrl: './club-revisions-list.component.html',
  styleUrls: ['./club-revisions-list.component.css']
})
export class ClubRevisionsListComponent implements OnInit {
  private _revisions!: IClubRevision[];

  @Input() get listRevisions(): IClubRevision[] {
    return this._revisions;
  }

  set listRevisions(value: IClubRevision[]) {
    if (value) {
      this.clubRevisions = this._revisions = value;
    }
  }

  clubRevisions: any[] = [];
  constructor(private sorterService: SorterService) { }

  ngOnInit(): void {
  }

  sort(prop: string) {
    this.sorterService.sort(this.clubRevisions, prop);
  }
}
