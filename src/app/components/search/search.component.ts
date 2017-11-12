import { Component, OnDestroy, OnInit } from '@angular/core';

import { BookService } from '../../core/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  term: string;
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.term = localStorage.getItem('term');
    this.search();
  }

  ngOnDestroy() {
    if (this.term) {
      localStorage.setItem('term', this.term);
    }
  }

  search(): void {
    if (this.term) {
      this.bookService.searchBooks(this.term).subscribe(data => {
        this.books = data;
      });
    }
  }

}
