import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'authorNameFormat' })
export class AuthorNameFormat implements PipeTransform {
    transform(authors: string[]): string {
        let str = "";
        for (let i = 0; i < authors.length; i++) {
            str += authors[i];
            if (i == authors.length - 2 && authors.length !== 1) str += " and ";
            else if (i != authors.length - 1) str += ", ";
        }
        return str;
    }
}