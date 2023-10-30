import { Component } from '@angular/core';
import { Library } from 'library';
import { BookService } from 'tbr.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  recommendations: Library | undefined;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookService.getBookshelf("100867979536054720588", "1001").subscribe(library => {
      this.recommendations = library;
    });
  }
}
