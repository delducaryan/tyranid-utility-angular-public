import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DataStoreService } from '../data-store.service';
import { FirestoreService } from 'src/app/firestore.service';

import { compareByName } from 'src/utilities/sort';

import Book from 'src/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  bookList: Book[];
  dataSource: MatTableDataSource<Book>;

  constructor(
    private ds: DataStoreService,
    private fs: FirestoreService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.fs.books$.subscribe(value => {
      this.bookList = value.sort(compareByName);

      this.dataSource = new MatTableDataSource(this.bookList);
    });
  }

  click = (book: Book) => {
    console.log(book.name);
  }

}
