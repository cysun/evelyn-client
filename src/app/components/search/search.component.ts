import { Component, OnInit, AfterViewChecked } from '@angular/core';

import { BookService } from '../../core/book.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';

declare var Materialize: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewChecked {

  term: string;
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.term = sessionStorage.getItem('term');
    this.search();
  }

  ngAfterViewChecked(): void {
    Materialize.updateTextFields();
  }

  search(): void {
    if (this.term) {
      this.bookService.searchBooks(this.term).subscribe(data => {
        this.books = data;
      });
      sessionStorage.setItem('term', this.term);
    }
  }

  clear(): boolean {
    this.term = '';
    this.books = [];
    sessionStorage.removeItem('term');
    return false;
  }

  viewBook(book: Book): void {
    this.router.navigate(['books', book._id]);
  }

  editBook(book: Book): void {
    this.router.navigate(['books/edit', book._id]);
  }

}
