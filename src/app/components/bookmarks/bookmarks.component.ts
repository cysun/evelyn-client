import { Component, OnInit } from '@angular/core';

import { BookmarkService } from '../../core/bookmark.service';
import { Bookmark } from '../../models/bookmark.model';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit() {
    this.bookmarkService.getBookmarks().subscribe(data => {
      this.bookmarks = data;
    });
  }

}
