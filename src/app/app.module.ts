import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MathematicianDetailComponent } from './mathematician-detail/mathematician-detail.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { TheoremDetailComponent } from './theorem-detail/theorem-detail.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    MathematicianDetailComponent,
    SubjectDetailComponent,
    TheoremDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


