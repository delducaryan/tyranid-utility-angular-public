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

  abilities$ = new BehaviorSubject<Ability[]>([]);
  biomorphs$ = new BehaviorSubject<Biomorph[]>([]);
  books$ = new BehaviorSubject<Book[]>([]);
  units$: Observable<Unit[]>;
  weapons$ = new BehaviorSubject<Weapon[]>([]);

  termagants$: Observable<unknown>;

  constructor(private afs: AngularFirestore) {
    afs.collection<Ability>('abilities').valueChanges({ idField: 'id'}).pipe(
      populateBookReferencesFromList(afs)
    ).subscribe((value: Ability[]) => this.abilities$.next(value));
    afs.collection<Biomorph>('biomorphs').valueChanges({ idField: 'id'}).pipe(
      populateBookReferencesFromList(afs)
    ).subscribe((value: Biomorph[]) => this.biomorphs$.next(value));
    afs.collection<Book>('books').valueChanges({ idField: 'id'}).subscribe(value => this.books$.next(value));
    // this.units$ = afs.collection<Unit>('units').valueChanges({ idField: 'id'}).pipe(
    //   populateUnitDataFromList(afs)
    // ) as Observable<Unit[]>;
    afs.collection<Weapon>('weapons').valueChanges({ idField: 'id'}).pipe(
      populateBookReferencesFromList(afs)
    ).subscribe((value: Weapon[]) => this.weapons$.next(value));

    // this.termagants$ = afs.doc('units/BPgy01fR5gc6oix96rBN').valueChanges().pipe(populateUnitData(afs));
  }

  addBook = (book: Book) => this.afs.collection('books').add(book);

  deleteBook = (id: string) => this.afs.collection('books').doc(id).delete();

  updateBook = (book: Book) => this.afs.collection('books').doc(book.id).update(book);
}
