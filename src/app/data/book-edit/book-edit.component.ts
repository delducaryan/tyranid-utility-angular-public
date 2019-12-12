import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { 
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DataStoreService } from '../data-store.service';
import { FirestoreService } from 'src/app/firestore.service';

import Book from 'src/models/book';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  bookForm = this.formBuilder.group(new Book());

  id: string;

  constructor(
    private dataStore: DataStoreService,
    private firestore: FirestoreService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    if (this.dataStore.book) {
      const data = this.dataStore.book;

      this.id = data.id;

      delete data.id;

      this.bookForm.setValue(data);
    }
  }

  clickSave = () => {
    const snackbarConfig = new MatSnackBarConfig();

    let snackbarMessage;

    snackbarConfig.duration = 3000;

    if (this.id) {
      // Update

      this.firestore.updateBook({
        id: this.id,
        ...this.bookForm.value,
      })
        .then(() => {
          snackbarMessage = 'Book updated successfully';
          snackbarConfig.panelClass = ['snackbar-success'];
        })
        .catch(e => {
          snackbarMessage = 'Failed to update book';
          snackbarConfig.panelClass = ['snackbar-fail'];

          console.log(e);
        })
        .finally(() => this.snackbar.open(snackbarMessage, undefined, snackbarConfig));
    } else {
      // Add

      this.firestore.addBook(this.bookForm.value)
        .then(value => {
          this.id = value.id;
          snackbarMessage = 'Book added successfully';
          snackbarConfig.panelClass = ['snackbar-success'];
        })
        .catch(e => {
          snackbarMessage = 'Failed to add book';
          snackbarConfig.panelClass = ['snackbar-fail'];

          console.log(e);
        })
        .finally(() => this.snackbar.open(snackbarMessage, undefined, snackbarConfig));
    }
  }

  clickToList = () => {
    this.router.navigateByUrl('/data/list-book');
  }

}
