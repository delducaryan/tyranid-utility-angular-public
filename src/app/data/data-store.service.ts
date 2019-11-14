import { Injectable } from '@angular/core';

import Book from 'src/models/book';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  book: Book;

  constructor() { }
}
