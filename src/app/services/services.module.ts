import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AuthService } from './auth.service';
import { BookService } from './book.service';
import { BookmarkService } from './bookmark.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [AuthService, BookmarkService, BookService]
})
export class ServicesModule {

  // make sure CoreModule is imported only once by AppModule
  constructor( @Optional() @SkipSelf() parentModule: ServicesModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule.');
    }
  }

}
