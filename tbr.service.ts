import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Book } from 'book';
import { Library } from 'library';


@Injectable({ providedIn: 'root' })
export class BookService {
    private APIUrl = 'https://www.googleapis.com/books/v1';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    // Get a book by its Google API-id
    getBook(id: string): Observable<Book> {
        const url = `${this.APIUrl}/volumes/${id}`;
        return this.http.get<Book>(url).pipe(
            tap(_ => console.log(`fetched book id=${id}`)),
            catchError(this.handleError<Book>(`getBook id=${id}`))
        );
    }

    // Get a collection of books based on a search parameter
    getLibrary(searchParam: string): Observable<Library> {
        const url = `${this.APIUrl}/volumes?q=${searchParam}`;
        return this.http.get<Library>(url).pipe(
            tap(_ => console.log(`fetched books by search ${searchParam}`)),
            catchError(this.handleError<Library>(`getLibrary search ${searchParam}`))
        );
    }

    // Return the list of volumes from a public Google API bookshelf
    getBookshelf(userId: string, shelf: string): Observable<Library> {
        // https://www.googleapis.com/books/v1/users/1112223334445556677/bookshelves/3/volumes
        const url = `${this.APIUrl}/users/${userId}/bookshelves/${shelf}/volumes`;
        return this.http.get<Library>(url).pipe(
            tap(_ => console.log(`fetched books userid=${userId}, shelf=${shelf}`)),
            catchError(this.handleError<Library>(`getBookshelf userid=${userId}, shelf=${shelf}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }

}