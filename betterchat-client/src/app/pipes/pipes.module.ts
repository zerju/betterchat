import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './time-ago.pipe';

const PIPES: any[] = [TimeAgoPipe];

@NgModule({ declarations: PIPES, exports: PIPES })
export class PipesModule {}
