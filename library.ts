import { Book } from "book";

export interface Library {
    items: Book[],
    kind: string,
    totalItems: number
}