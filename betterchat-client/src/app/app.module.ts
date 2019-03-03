import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';
import { ComponentsModule } from './components/components.module';
import { LayoutState } from 'src/app/core/state/layout.state';
import { PlatformState } from 'src/app/core/state/platform.state';
import { HttpClientModule } from '@angular/common/http';
import { AuthState } from './core/state/auth.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    NgxsModule.forRoot([LayoutState, PlatformState, AuthState], {
      developmentMode: !environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
