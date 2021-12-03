import { NgModule } from '@angular/core';
import { FormattedTimePipe } from './formatted-time.pipe';
import { GenderPipe } from './gender.pipe';

@NgModule({
  declarations: [
    FormattedTimePipe,
    GenderPipe
  ],
  imports: [
  ],
  exports: [
    FormattedTimePipe,
    GenderPipe
  ]
})

export class PipesModule { }