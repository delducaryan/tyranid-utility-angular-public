import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import {
  populateBookReferencesFromList,
  // populateUnitData,
  // populateUnitDataFromList,
} from './doc-join';

import Ability from 'src/models/ability';
import Biomorph from 'src/models/biomorph';
import Book from 'src/models/book';
import Unit from 'src/models/unit';
import Weapon from 'src/models/weapon';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  abilities$: Observable<Ability[]>;
  biomorphs$: Observable<Biomorph[]>;
  books$: Observable<Book[]>;
  units$: Observable<Unit[]>;
  weapons$: Observable<Weapon[]>;

  termagants$: Observable<unknown>;

  constructor(private afs: AngularFirestore) {
    this.abilities$ = afs.collection<Ability>('abilities').valueChanges({ idField: 'id'}).pipe(
      populateBookReferencesFromList(afs)
    ) as Observable<Ability[]>;
    this.biomorphs$ = afs.collection<Biomorph>('biomorphs').valueChanges({ idField: 'id'}).pipe(
      populateBookReferencesFromList(afs)
    ) as Observable<Biomorph[]>;
    this.books$ = afs.collection<Book>('books').valueChanges({ idField: 'id'});
    // this.units$ = afs.collection<Unit>('units').valueChanges({ idField: 'id'}).pipe(
    //   populateUnitDataFromList(afs)
    // ) as Observable<Unit[]>;
    this.weapons$ = afs.collection<Weapon>('weapons').valueChanges({ idField: 'id'}).pipe(
      populateBookReferencesFromList(afs)
    ) as Observable<Weapon[]>;

    // this.termagants$ = afs.doc('units/BPgy01fR5gc6oix96rBN').valueChanges().pipe(populateUnitData(afs));
  }

  bookAdd = (book: Book) => this.afs.collection('books').add(book);

  bookUpdate = (book: Book) => null;
}
