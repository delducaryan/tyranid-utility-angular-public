import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  items: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.items = db.collection('biomorphs').valueChanges();
  }
}
