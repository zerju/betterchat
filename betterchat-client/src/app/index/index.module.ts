import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { ComponentsModule } from './../components/components.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, IndexRoutingModule, ComponentsModule]
})
export class IndexModule {}
