import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchBooks(): void {
    const input = document.querySelector('input')?.value;
    console.log(input);
    console.log(input, `${window.location.protocol}//${window.location.host}/library/${input}`, window.location.host);
    window.location.replace(`${window.location.protocol}//${window.location.host}/library/${input}`);

  }
}
