import { Component, Input, OnInit } from '@angular/core';
import { SorterService } from 'src/app/core/sorter-service.service';
import { IPersonRevision } from 'src/app/shared/iperson-revision.interface';

@Component({
  selector: 'app-person-revisions-list',
  templateUrl: './person-revisions-list.component.html',
  styleUrls: ['./person-revisions-list.component.css']
})
export class PersonRevisionsListComponent implements OnInit {
  private _revisions!: IPersonRevision[];

  @Input() get listRevisions(): IPersonRevision[] {
    return this._revisions;
  }

  set listRevisions(value: IPersonRevision[]) {
    if (value) {
      this.personRevisions = this._revisions = value;
    }
  }

  personRevisions: any[] = [];
  constructor(private sorterService: SorterService) { }

  ngOnInit(): void {
  }

  sort(prop: string) {
    this.sorterService.sort(this.personRevisions, prop);
  }
}
