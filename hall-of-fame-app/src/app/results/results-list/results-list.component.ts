import { Component, Input, OnInit } from '@angular/core';
import { SorterService } from 'src/app/core/sorter-service.service';
import { IResultEx } from 'src/app/shared/iresult-ex.interface';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {
  private _results: IResultEx[] = [];

  @Input() get listResults(): IResultEx[] {
    return this._results;
  }

  set listResults(value: IResultEx[]) {
    if (value) {
      this.results = this._results = value;
    }
  }

  results: any[] = [];

  constructor(private sorterService: SorterService) { }

  ngOnInit(): void {
  }

  sort(prop: string) {
    this.sorterService.sort(this.results, prop);
  }
}
