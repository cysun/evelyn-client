import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Book } from '../models/book.model';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  getBook(id): Observable<Book> {
    return this.http.get<Book>('/api/books/' + id);
  }

  getBookContent(id): Observable<string> {
    return this.http.get('/api/files/' + id + '.html', { responseType: 'text' });
  }

  searchBooks(term: string): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books/search', {
      params: new HttpParams().set('term', term)
    });
  }

  addBook(book: Book, content: File, cover: File): Observable<Book> {
    const formData = new FormData();
    formData.append('author', book.author);
    formData.append('title', book.title);
    formData.append('content', content);
    if (book.notes) { formData.append('notes', book.notes); }
    if (cover) { formData.append('cover', cover); }
    return this.http.post<Book>('/api/books', formData);
  }

  updateBook(book: Book, content: File, cover: File, append: boolean): Observable<Book> {
    const formData = new FormData();
    formData.append('author', book.author);
    formData.append('title', book.title);
    if (book.notes) { formData.append('notes', book.notes); }
    if (content) { formData.append('content', content); }
    if (cover) { formData.append('cover', cover); }
    if (append) { formData.append('append', 'true'); }
    return this.http.put<Book>('/api/books/' + book._id, formData);
  }

}
