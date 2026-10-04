import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route, Router } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { PageComponent } from './page/page.component';
import { UniversiteDetailComponent } from './universite-detail/universite-detail.component';
import { ClassementComponent } from './classement/classement.component';
import { AvisComponent } from './avis/avis.component';
import { EssaiComponent } from './essai/essai.component';

const routes: Routes = [
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'page', component: PageComponent },
  { path: 'universite/:id', component: UniversiteDetailComponent },
  { path: 'classement', component: ClassementComponent },
  { path: 'avis', component: AvisComponent },
  { path: 'essai', component: EssaiComponent },
  // {path:'',component:}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
