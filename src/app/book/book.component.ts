import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BookService } from 'tbr.service';
import { Book } from 'book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
      console.log(book);
    });
  }
}


