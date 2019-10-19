import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-view-data',
  templateUrl: './test-view-data.component.html',
  styleUrls: ['./test-view-data.component.scss']
})
export class TestViewDataComponent implements OnInit {

  units: any[];

  constructor(private firestoreService: FirestoreService) {
    firestoreService.units$.subscribe(val => this.units = val);
  }

  ngOnInit() {
  }
}
