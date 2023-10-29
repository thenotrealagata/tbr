import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from 'book';
import { BookService } from 'tbr.service';
import { Library } from 'library';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  library: Library | undefined;
  books: Book[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getLibrary();
  }

  getLibrary(): void {
    const search = this.route.snapshot.paramMap.get('search')!;
    this.bookService.getLibrary(search).subscribe(library => {
      this.library = library;
      this.books = library.items;
      console.log(this.books);
    });
  }
}


