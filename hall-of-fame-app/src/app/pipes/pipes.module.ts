import { NgModule } from '@angular/core';
import { FormattedTimePipe } from './formatted-time.pipe';
import { SexPipe } from './sex.pipe';

@NgModule({
  declarations: [
    FormattedTimePipe,
    SexPipe
  ],
  imports: [
  ],
  exports: [
    FormattedTimePipe,
    SexPipe
  ]
})

export class PipesModule { }