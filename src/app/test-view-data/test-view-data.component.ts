import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-view-data',
  templateUrl: './test-view-data.component.html',
  styleUrls: ['./test-view-data.component.css']
})
export class TestViewDataComponent implements OnInit {

  items: any[];

  constructor(private firestoreService: FirestoreService) {
    firestoreService.items.subscribe(val => this.items = val);
  }

  ngOnInit() {
  }

}
