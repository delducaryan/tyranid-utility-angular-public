import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { DataStoreService } from '../data-store.service';
import { FirestoreService } from 'src/app/firestore.service';

import Book from 'src/models/book';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  bookForm = this.fb.group(new Book());

  id: string;

  constructor(
    private ds: DataStoreService,
    private fs: FirestoreService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.ds.book) {
      this.id = this.ds.book.id;

      const data = this.ds.book;

      delete data.id;

      this.bookForm.setValue(data);
    }
  }

  clickSave = () => {
    if (this.id) {
      // Update


    } else {
      // Add

      this.fs.bookAdd(this.bookForm.value)
        .then(value => {
          console.log('Success!');
          console.log(value.id);
        });
    }
  }

}
