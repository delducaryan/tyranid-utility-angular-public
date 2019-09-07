import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { populateWeaponOptions } from './doc-join';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  items$: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.items$ = afs.collection('biomorphs').valueChanges();

    afs.doc('units/BPgy01fR5gc6oix96rBN').valueChanges().pipe(populateWeaponOptions(afs)).subscribe(val => {
      console.log(val);
    });
  }
}
