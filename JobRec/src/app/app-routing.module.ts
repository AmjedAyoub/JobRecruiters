import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { CandidateComponent } from './candidate/candidate.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'candidates', component: CandidateComponent, canActivate: [AuthGuard] },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
