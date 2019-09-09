import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { populateAllUnitData } from './doc-join';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  items$: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.items$ = afs.collection('weapons').valueChanges();

    afs.doc('units/BPgy01fR5gc6oix96rBN').valueChanges().pipe(populateAllUnitData(afs)).subscribe(val => {
      console.log(val);
    });
  }
}
