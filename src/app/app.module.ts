import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { PageComponent } from './page/page.component';
import { UniversiteDetailComponent } from './universite-detail/universite-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    PageComponent,
    // UniversiteDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
