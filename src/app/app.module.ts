import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize/dist';

import { AppComponent } from './app.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';
import { AddBookComponent } from './components/add-book/add-book.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard] },
  { path: 'books/add', component: AddBookComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookmarksComponent,
    BooksComponent,
    SearchComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MaterializeModule,
    FormsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
