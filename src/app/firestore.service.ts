import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { populateWeaponReferences, populateBookReference, populateSharedAbilityReferences } from './doc-join';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  items$: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.items$ = afs.collection('biomorphs').valueChanges();

    afs.doc('units/BPgy01fR5gc6oix96rBN').valueChanges().pipe(populateWeaponReferences(afs)).subscribe(val => {
      // console.log(val);
    });

    afs.doc('units/BPgy01fR5gc6oix96rBN').valueChanges().pipe(populateBookReference(afs)).subscribe(val => {
      // console.log(val);
    });

    afs.doc('units/BPgy01fR5gc6oix96rBN').valueChanges().pipe(populateSharedAbilityReferences(afs)).subscribe(val => {
      // console.log(val);
    });
  }
}
