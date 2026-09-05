import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route, Router } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'page', component: PageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
