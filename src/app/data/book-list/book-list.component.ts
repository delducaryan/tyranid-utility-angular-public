import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

import { DataStoreService } from '../data-store.service';
import { FirestoreService } from 'src/app/firestore.service';

import { compareByName } from 'src/utilities/sort';

import Book from 'src/models/book';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<Book>([]);

  constructor(
    private dataStore: DataStoreService,
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.firestore.books$.subscribe(value => this.dataSource.data = value.sort(compareByName));
  }

  clickAdd = () => {
    this.router.navigateByUrl('/data/edit-book');
  }

  clickDelete = (book: Book) => {
    const dialogRef = this.dialog.open(BookDialogComponent, { data: book.name });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        const snackbarConfig = new MatSnackBarConfig();

        let snackbarMessage;

        snackbarConfig.duration = 3000;

        this.firestore.deleteBook(book.id)
          .then(() => {
            snackbarMessage = book.name + ' deleted successfully';
            snackbarConfig.panelClass = ['snackbar-success'];
          })
          .catch((e) => {
            snackbarMessage = 'Failed to delete ' + book.name;
            snackbarConfig.panelClass = ['snackbar-fail'];

            console.log(e);
          })
          .finally(() => this.snackbar.open(snackbarMessage, undefined, snackbarConfig));
      }
    });
  }

  clickEdit = (book: Book) => {
    this.dataStore.book = book;

    this.router.navigateByUrl('/data/edit-book');
  }

}
