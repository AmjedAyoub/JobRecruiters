import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AgGridModule } from 'ag-grid-angular';

import { AuthService } from './_services/auth.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { DataService } from './_services/data.service';
import { CandidateComponent } from './candidate/candidate.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    SearchComponent,
    CandidateComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FileUploadModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
