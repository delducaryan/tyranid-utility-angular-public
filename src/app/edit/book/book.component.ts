import {
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  bookForm = this.fb.group({
    name: '',
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  save = () => {
    console.log(this.bookForm.value.name);
  }

}
