import { Component, OnInit, HostBinding, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../core/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AfterViewChecked, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { BookmarkService } from '../../core/bookmark.service';
import { Bookmark } from '../../models/bookmark.model';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser/src/security/dom_sanitization_service';

declare var jQuery: any;

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit, OnDestroy {

  @ViewChild('display') el: ElementRef;

  bookId: string;
  content: SafeHtml;

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

  // Code from http://blog.sodhanalibrary.com/2016/10/detect-when-user-stops-scrolling-using.html
  _timeout: any = null;

  constructor(private bookService: BookService, private bookmarkService: BookmarkService,
    private router: Router, private route: ActivatedRoute,
    private renderer: Renderer2, private sanitizer: DomSanitizer) {
    window.onscroll = () => {
      if (this._timeout) {
        window.clearTimeout(this._timeout);
      }
      this._timeout = setTimeout(() => {
        this._timeout = null;
        const position = jQuery('p:in-viewport').first().attr('data-index');
        if (position) {
          this.bookmarkService.updateBookmark(this.bookId, position
          ).subscribe(() => { });
        }
      }, 1500);
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.bookService.getBookContent(this.bookId).subscribe(content => {
        this.content = this.sanitizer.bypassSecurityTrustHtml(content);
        this.bookmarkService.getBookmark(this.bookId).subscribe(bookmark => {
          if (bookmark) {
            jQuery(window).scrollTop(jQuery('p[data-index="' + bookmark.position + '"]').offset().top);
          } else {
            this.bookmarkService.addBookmark(this.bookId, 1).subscribe(() => { });
          }
        });
      });
    });
    this.renderer.addClass(document.body, this.backgroundClass);
  }

  ngOnDestroy(): void {
    window.onscroll = null;
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
