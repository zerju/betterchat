import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './index/index.module#IndexModule'
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'about', loadChildren: './about/about.module#AboutModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
