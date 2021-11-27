import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormattedTimePipe } from './formatted-time.pipe';



@NgModule({
  declarations: [
    FormattedTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormattedTimePipe
  ]
})
export class PipesModule { }
