import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './time-ago.pipe';
import { MissingImagePipe } from './missing-image.pipe';

const PIPES: any[] = [TimeAgoPipe, MissingImagePipe];

@NgModule({ declarations: PIPES, exports: PIPES })
export class PipesModule {}
