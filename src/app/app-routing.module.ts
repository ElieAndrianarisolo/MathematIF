import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MathematicianDetailComponent } from './mathematician-detail/mathematician-detail.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import {TheoremDetailComponent} from "./theorem-detail/theorem-detail.component";

const routes: Routes = [
	{ path: 'searchbar', component: SearchbarComponent },
	{ path: '', redirectTo: 'searchbar', pathMatch: 'full' },
	{ path: 'Mathematician/:value', component: MathematicianDetailComponent },
	{ path: 'Subject/:value', component: SubjectDetailComponent },
	{ path: 'Theorem/:value', component: TheoremDetailComponent }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }


