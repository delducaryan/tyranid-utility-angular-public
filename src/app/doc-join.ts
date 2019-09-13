import {
  AngularFirestore,
  DocumentReference
} from '@angular/fire/firestore';
import {
  BehaviorSubject,
  combineLatest,
  defer,
  Observable,
} from 'rxjs';
import {
  map,
  switchMap,
} from 'rxjs/operators';
import Ability from '../classes/ability';
import Biomorph from '../classes/biomorph';
import Book from '../classes/book';
import Unit from '../classes/unit';
import Weapon from '../classes/weapon';

export const populateBookReference = (afs: AngularFirestore) => (
  source => (
    defer(() => {
      let parent: Ability | Biomorph | Unit | Weapon;

      return source.pipe(
        switchMap((data: typeof parent) => {
          parent = data;

          const reference = parent.book.reference as DocumentReference;

          return afs.doc(reference).valueChanges();
        }),
        map((book: Book) => {
          parent.book.reference = book;

          return parent;
        }),
      );
    })
  )
);

export const populateArrayOptionReferences = (afs: AngularFirestore, category: string) => (
  source => (
    defer(() => {
      const addresses: number[][][] = [];
      let parent: Unit;

      return source.pipe(
        switchMap((data: Unit) => {
          parent = new Unit(data);

          const docs$: Observable<unknown>[] = [];
          const seenDocs: string[] = [];

          parent[category].forEach((item, i) => {
            item.options.forEach((option, j) => {
              const reference = option.reference as DocumentReference;
              const index = seenDocs.findIndex(id => id === reference.id);

              if (index === -1) {
                addresses.push([[i, j]]);
                docs$.push(afs.doc(reference).valueChanges().pipe(populateBookReference(afs)));
                seenDocs.push(reference.id);
              } else {
                addresses[index].push([i, j]);
              }
            });
          });

          if (docs$.length === 0) {
            return new BehaviorSubject([]);
          }

          return combineLatest(docs$);
        }),
        map((arr: (Biomorph | Weapon)[]) => {
          arr.forEach((doc, i) => {
            addresses[i].forEach((address: number[]) => {
              parent[category][address[0]].options[address[1]].reference = doc;
            });
          });

          return parent;
        }),
      );
    })
  )
);

export const populateBiomorphReferences = (afs: AngularFirestore) => (
  source => (
    defer(() => {
      let parent: Unit;

      return source.pipe(
        switchMap((data: Unit) => {
          parent = new Unit(data);

          const docs$: Observable<unknown>[] = [];

          parent.biomorphs.forEach((item) => {
            const reference = item.reference as DocumentReference;

            docs$.push(afs.doc(reference).valueChanges().pipe(populateBookReference(afs)));
          });

          if (docs$.length === 0) {
            return new BehaviorSubject([]);
          }

          return combineLatest(docs$);
        }),
        map((arr: Biomorph[]) => {
          arr.forEach((biomorph, i) => {
            parent.biomorphs[i].reference = biomorph;
          });

          return parent;
        }),
      );
    })
  )
);

export const populateSharedAbilityReferences = (afs: AngularFirestore) => (
  source => (
    defer(() => {
      let parent: Unit;

      return source.pipe(
        switchMap((data: Unit) => {
          parent = new Unit(data);

          const references = parent.abilitiesShared as DocumentReference[];
          const docs$: Observable<unknown>[] = [];

          references.forEach((reference) => {
            docs$.push(afs.doc(reference).valueChanges().pipe(populateBookReference(afs)));
          });

          if (docs$.length === 0) {
            return new BehaviorSubject([]);
          }

          return combineLatest(docs$);
        }),
        map((arr: Ability[]) => {
          arr.forEach((item, i) => {
            parent.abilitiesShared[i] = item;
          });

          return parent;
        }),
      );
    })
  )
);

export const populateAllUnitData = (afs: AngularFirestore) => (
  source => (
    defer(() => (
      source.pipe(
        populateBookReference(afs),
        populateBiomorphReferences(afs),
        populateSharedAbilityReferences(afs),
        populateArrayOptionReferences(afs, 'biomorphsLimited'),
        populateArrayOptionReferences(afs, 'weapons'),
        populateArrayOptionReferences(afs, 'weaponsLimited'),
      )
    ))
  )
);
