import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize/dist';

import { AppComponent } from './app.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { ServicesModule } from './services/services.module';

const routes: Routes = [
  { path: '', redirectTo: 'bookmarks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthService], }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookmarksComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterializeModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
