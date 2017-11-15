import { Component, OnInit, HostBinding, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../core/book.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit, OnDestroy {

  @ViewChild('display') el: ElementRef;

  content: string;

  fontSize: number;
  backgroundClass = 'day';
  get btnClasses() {
    return {
      'amber': this.backgroundClass === 'day',
      'lighten-3': this.backgroundClass === 'day',
      'grey': this.backgroundClass === 'night',
      'darken-3': this.backgroundClass === 'night'
    };
  }

  constructor(private bookService: BookService, private router: Router,
    private route: ActivatedRoute, private renderer: Renderer2) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookService.getBookContent(params['id']).
        subscribe(content => {
          this.content = content;
        });
    });
    this.renderer.addClass(document.body, this.backgroundClass);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, this.backgroundClass);
  }

  toggleBackground(): void {
    this.renderer.removeClass(document.body, this.backgroundClass);
    this.backgroundClass = this.backgroundClass === 'day' ? 'night' : 'day';
    this.renderer.addClass(document.body, this.backgroundClass);
  }

  increaseFontSize() {
    this.fontSize = parseFloat(jQuery(this.el.nativeElement).css('font-size')) * 1.2;
  }

  decreaseFontSize() {
    this.fontSize = parseFloat(jQuery(this.el.nativeElement).css('font-size')) / 1.2;
  }

}
