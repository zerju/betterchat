import { NgModule } from '@angular/core';
import { MessageImageDirective } from './message-image.directive';
import { CommonModule } from '@angular/common';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';

const DIRECTIVES: any[] = [MessageImageDirective, ScrollIntoViewDirective];

@NgModule({
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class DirectivesModule {}
