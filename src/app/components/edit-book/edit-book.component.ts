import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { BookService } from '../../core/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.model';

declare var Materialize: any;

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit, AfterViewChecked {

  book: Book = new Book();
  content: File;
  cover: File;
  append = false;

  constructor(private bookService: BookService, private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookService.getBook(params['id']).
        subscribe(book => {
          this.book = book;
        });
    });
  }

  ngAfterViewChecked(): void {
    Materialize.updateTextFields();
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

  saveBook() {
    this.bookService.updateBook(this.book, this.content, this.cover, this.append)
      .subscribe(() => this.router.navigate(['books']), err => console.log(err));
  }

}
