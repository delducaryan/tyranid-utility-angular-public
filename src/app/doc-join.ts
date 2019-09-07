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

export const populateWeaponOptions = (afs: AngularFirestore) => (
  source => (
    defer(() => {
      const addresses: number[][][] = [];
      let parent: {
        weapons: {
          options: {
            reference: DocumentReference | object,
          }[],
        }[],
      };
      let weapons: typeof parent.weapons;

      return source.pipe(
        switchMap((data: typeof parent) => {
          parent = data;
          weapons = parent.weapons;

          const docs$: Observable<unknown>[] = [];
          const seenDocs: string[] = [];

          weapons.forEach((
            weapon,
            i,
          ) => {
            weapon.options.forEach((
              option,
              j,
            ) => {
              const reference = option.reference as DocumentReference;
              const index = seenDocs.findIndex(id => id === reference.id);

              if (index === -1) {
                addresses.push([[i, j]]);
                docs$.push(afs.doc(reference).valueChanges());
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
              weapons[address[0]].options[address[1]].reference = doc;
            });
          });

          return {
            ...parent,
            weapons,
          };
        })
      );
    })
  )
);
