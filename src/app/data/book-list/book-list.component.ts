import {
  animate,
  state,
  style,
  transition,
  trigger,
  query,
} from '@angular/animations';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

import { DataStoreService } from '../data-store.service';
import { FirestoreService } from 'src/app/firestore.service';

import { compareByName } from 'src/utilities/sort';

import { BookDialogComponent } from '../book-dialog/book-dialog.component';

import Book from 'src/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  animations: [
    trigger('expandDetails', [
      state('true', style({
        height: '*',
      })),
      state('false', style({
        height: '0px',
      })),
      transition('false <=> true', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BookListComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<Book>([]);
  expandedId: string;

  constructor(
    private dataStore: DataStoreService,
    private dialog: MatDialog,
    private firestore: FirestoreService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.firestore.books$.subscribe(value => this.dataSource.data = value.sort(compareByName));
  }

  clickAdd = () => {
    // this.router.navigateByUrl('/data/edit-book');
  }

  clickDelete = (book: Book) => {
    console.log('clickDelete Reached');
    // const dialogRef = this.dialog.open(BookDialogComponent, { data: book.name });

    // dialogRef.afterClosed().subscribe(value => {
      // if (value) {
      //   const snackbarConfig = new MatSnackBarConfig();

      //   let snackbarMessage;

      //   snackbarConfig.duration = 3000;

      //   this.firestore.deleteBook(book.id)
      //     .then(() => {
      //       snackbarMessage = book.name + ' deleted successfully';
      //       snackbarConfig.panelClass = ['snackbar-success'];
      //     })
      //     .catch((e) => {
      //       snackbarMessage = 'Failed to delete ' + book.name;
      //       snackbarConfig.panelClass = ['snackbar-fail'];

      //       console.log(e);
      //     })
      //     .finally(() => this.snackbar.open(snackbarMessage, undefined, snackbarConfig));
      // }
    // });
  }

  clickEdit = (book: Book) => {
    console.log('clickEdit Reached');
    // this.dataStore.book = book;

    // this.router.navigateByUrl('/data/edit-book');
  }

  clickRow = (id: string) => {
    if (this.expandedId !== id) {
      this.expandedId = id;
    } else {
      this.expandedId = undefined;
    }
  }

}
