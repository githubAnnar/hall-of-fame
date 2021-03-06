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
  private _showGenderFilter: boolean = false;

  @Input() get listResults(): IResultEx[] {
    return this._results;
  }

  set listResults(value: IResultEx[]) {
    if (value) {
      this.filteredResults = this._results = value;
    }
  }

  @Input() get showGenderFilter(): boolean {
    return this._showGenderFilter;
  }

  set showGenderFilter(value: boolean) {
    if (value) {
      this.showFilter = this._showGenderFilter = value;
    }
  }

  showFilter: boolean = false;
  filteredResults: any[] = [];

  constructor(private sorterService: SorterService) { }

  ngOnInit(): void {
  }

  filter(data: string) {
    if (data) {
      this.filteredResults = this.listResults.filter((result: IResultEx) => {
        if (data === "0") {
          return result;
        }

        if (data === "1") {
          return result.Gender === 1;
        }

        return result.Gender === 2;
      });
    } else {
      this.filteredResults = this.listResults;
    }
  }

  sort(prop: string) {
    this.sorterService.sort(this.filteredResults, prop);
  }
}
