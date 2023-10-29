import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Book } from 'book';
import { Library } from 'library';


@Injectable({ providedIn: 'root' })
export class BookService {
    private APIUrl = 'https://www.googleapis.com/books/v1/volumes';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getBook(id: string): Observable<Book> {
        const url = `${this.APIUrl}/${id}`; //?key=${this.APIkey}`;
        return this.http.get<Book>(url).pipe(
            tap(_ => console.log(`fetched book id=${id}`)),
            catchError(this.handleError<Book>(`getBook id=${id}`))
        );
    }

    getLibrary(searchParam: string): Observable<Library> {
        const url = `${this.APIUrl}?q=${searchParam}`;
        return this.http.get<Library>(url).pipe(
            tap(_ => console.log(`fetched book id=${searchParam}`)),
            catchError(this.handleError<Library>(`getBook id=${searchParam}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

}