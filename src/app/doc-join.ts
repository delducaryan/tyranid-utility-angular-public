import {
  AngularFirestore,
  DocumentReference
} from '@angular/fire/firestore';
import {
  combineLatest,
  defer,
  Observable,
} from 'rxjs';
import {
  map,
  switchMap,
} from 'rxjs/operators';

export const populateBookReference = (afs: AngularFirestore) => (
  source => (
    defer(() => {
      let parent: {
        book: {
          reference: DocumentReference | object,
        },
      };

      return source.pipe(
        switchMap((data: typeof parent) => {
          parent = data;

          const reference = parent.book.reference as DocumentReference;

          return afs.doc(reference).valueChanges();
        }),
        map((obj: object) => {
          parent.book.reference = obj;

          return parent;
        })
      );
    })
  )
);

export const populateSharedAbilityReferences = (afs: AngularFirestore) => (
  source => (
    defer(() => {
      let parent: {
        'abilities-shared': (DocumentReference | object)[],
      };

      return source.pipe(
        switchMap((data: typeof parent) => {
          parent = data;

          const references = parent['abilities-shared'] as DocumentReference[];
          const docs$: Observable<unknown>[] = [];

          references.forEach((reference) => {
            docs$.push(afs.doc(reference).valueChanges().pipe(populateBookReference(afs)));
          });

          return combineLatest(docs$);
        }),
        map((arr: object[]) => {
          arr.forEach((doc, i) => {
            parent['abilities-shared'][i] = doc;
          });

          return parent;
        })
      );
    })
  )
);

export const populateArrayOptionReferences = (afs: AngularFirestore, category: string) => (
  source => (
    defer(() => {
      const addresses: number[][][] = [];
      let parent: {
        [category: string]: {
          options: {
            reference: DocumentReference | object,
          }[],
        }[],
      };

      return source.pipe(
        switchMap((data: typeof parent) => {
          parent = data;

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

          return combineLatest(docs$);
        }),
        map((arr: object[]) => {
          arr.forEach((doc, i) => {
            addresses[i].forEach((address: number[]) => {
              parent[category][address[0]].options[address[1]].reference = doc;
            });
          });

          return parent;
        })
      );
    })
  )
);
