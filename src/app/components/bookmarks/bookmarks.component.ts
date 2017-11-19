import { Component, OnInit } from '@angular/core';

import { BookmarkService } from '../../core/bookmark.service';
import { Bookmark } from '../../models/bookmark.model';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService, private router: Router) { }

  ngOnInit() {
    this.bookmarkService.getBookmarks().subscribe(data => {
      this.bookmarks = data;
    });
  }

  viewBook(book: Book): void {
    this.router.navigate(['books', book._id]);
  }

  editBook(book: Book): void {
    this.router.navigate(['books/edit', book._id]);
  }

  deleteBookmark(bookmark: Bookmark): void {
    this.bookmarkService.deleteBookmark(bookmark._id).subscribe(() =>
      this.bookmarks.splice(this.bookmarks.indexOf(bookmark), 1));
  }

  search(term: string): void {
    this.router.navigate(['search'], { queryParams: { term } });
  }

}
