import { Component, Input, OnInit } from '@angular/core';
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

  @Input() showDescription?: boolean = true;
  @Input() bookshelf?: Library;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    if (this.bookshelf == undefined) this.getLibrary();
    else {
      this.library = this.bookshelf;
      this.books = this.library.items;
    }
  }

  getLibrary(): void {
    const search = this.route.snapshot.paramMap.get('search')!;
    this.bookService.getLibrary(search).subscribe(library => {
      this.library = library;
      this.books = library.items;
      console.log(this.books);
    });
  }

  changeBookDisplay(): void {
    this.showDescription = !this.showDescription;
  }
}


