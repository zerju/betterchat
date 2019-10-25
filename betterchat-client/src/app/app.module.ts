import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule, NGXS_PLUGINS } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';
import { ComponentsModule } from './components/components.module';
import { LayoutState } from './core/state/layout.state';
import { PlatformState } from './core/state/platform.state';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthState } from './core/state/auth.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { logoutPlugin } from './core/plugins/logout.plugin';
import { MessageState } from './core/state/message.state';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    NgxsModule.forRoot([LayoutState, PlatformState, AuthState, MessageState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({ key: ['auth.user', 'layout'] })
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: NGXS_PLUGINS,
      useValue: logoutPlugin,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
