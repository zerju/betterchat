import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayoutComponent } from './layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';

const COMPONENTS: any[] = [ToolbarComponent, LayoutComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, MatToolbarModule],
  exports: [COMPONENTS]
})
export class ComponentsModule {}
