import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../core/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  book: Book = new Book();
  content: File;
  cover: File;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
  }

  contentChange(event): void {
    if (event.target.files.length > 0) {
      this.content = event.target.files[0];
    }
  }

  coverChange(event): void {
    if (event.target.files.length > 0) {
      this.cover = event.target.files[0];
    }
  }

  addBook() {
    if (this.content) {
      this.bookService.addBook(this.book, this.content, this.cover).subscribe(
        () => this.router.navigate(['books']),
        err => console.log(err)
      );
    }
  }

}
