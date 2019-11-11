import {
  AngularFirestore,
  DocumentReference,
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

import Ability from 'src/models/ability';
import Biomorph from 'src/models/biomorph';
import Book from 'src/models/book';
import Unit from 'src/models/unit';
import Weapon from 'src/models/weapon';
import { compareByVariantName } from 'src/utilities/sort';

const populateBookReferenceFromObject = (afs: AngularFirestore) => ( // USED
  (source: Observable<Ability | Biomorph | Unit | Weapon>) => (
    defer(() => {
      let parent: Ability | Biomorph | Unit | Weapon;

      return source.pipe(
        switchMap((data: typeof parent) => {
          parent = data;

          const reference = parent.book.reference as DocumentReference;

          return afs.doc<Book>(reference).valueChanges();
        }),
        map((book: Book) => {
          parent.book.reference = book;

          return parent;
        }),
      );
    })
  )
);

const getDocsAndAddressesFromOptionsArray = ( // USED
  afs: AngularFirestore,
  unitIndex: number,
  unitCategory: string,
  docsCategory: string,
  optionsArray: DocumentReference[][],
  addresses: {
    abilities: number[][],
    biomorphs: number[][],
    biomorphsLimited: number[][],
    weapons: number[][],
    weaponsLimited: number[][],
  },
  seenDocs: {
    abilities: {
      id: string,
      index: number,
    }[],
    biomorphs: {
      id: string,
      index: number,
    }[],
    weapons: {
      id: string,
      index: number,
    }[],
  },
  docs$: Observable<Ability | Biomorph | Weapon>[],
) => {
  optionsArray.forEach((selection, selectionIndex) => {
    selection.forEach((reference, refIndex) => {
      const i = seenDocs[docsCategory].findIndex(item => item.id === reference.id);

      if (i === -1) {
        addresses[unitCategory].push([unitIndex, selectionIndex, refIndex, docs$.length]);
        seenDocs[docsCategory].push({
          id: reference.id,
          index: docs$.length,
        });
        docs$.push(afs.doc<Biomorph | Weapon>(reference).valueChanges().pipe(
          populateBookReferenceFromObject(afs)
        ) as Observable<Biomorph | Weapon>);
      }
    });
  });
};

const getDocsAndAddressesFromReferences = ( // USED
  afs: AngularFirestore,
  unitIndex: number,
  category: string,
  references: DocumentReference[],
  addresses: {
    abilities: number[][],
    biomorphs: number[][],
    biomorphsLimited: number[][],
    weapons: number[][],
    weaponsLimited: number[][],
  },
  seenDocs: {
    abilities: {
      id: string,
      index: number,
    }[],
    biomorphs: {
      id: string,
      index: number,
    }[],
    weapons: {
      id: string,
      index: number,
    }[],
  },
  docs$: Observable<Ability | Biomorph | Weapon>[],
) => {
  references.forEach((reference, refIndex) => {
    const i = seenDocs[category].findIndex(item => item.id === reference.id);

    if (i === -1) {
      addresses[category].push([unitIndex, refIndex, docs$.length]);
      seenDocs[category].push({
        id: reference.id,
        index: docs$.length,
      });
      docs$.push(afs.doc<Ability | Biomorph>(reference).valueChanges().pipe(
        populateBookReferenceFromObject(afs)
      ) as Observable<Ability | Biomorph>);
    } else {
      addresses[category].push([unitIndex, refIndex, seenDocs[category][i].index]);
    }
  });
};

const getDocsFromReferences = (afs: AngularFirestore, references: DocumentReference[]) => {
  const docs$: Observable<Ability | Biomorph>[] = [];

  references.forEach((reference) => {
    docs$.push(afs.doc(reference).valueChanges().pipe(populateBookReferenceFromObject(afs)) as Observable<Ability | Biomorph>);
  });

  if (docs$.length === 0) {
    return new BehaviorSubject([]);
  }

  return combineLatest(docs$);
};

const populateOptionArrayReferencesFromUnit = (afs: AngularFirestore, category: string) => (
  (source: Observable<Unit>) => (
    defer(() => {
      const addresses: number[][][] = [];
      let parent: Unit;

      return source.pipe(
        switchMap((data: Unit) => {
          parent = new Unit(data);

          const docs$: Observable<Biomorph | Weapon>[] = [];
          const seenDocs: string[] = [];

          parent[category].forEach((item, i) => {
            item.options.forEach((option, j) => {
              const reference = option.reference as DocumentReference;
              const index = seenDocs.findIndex(id => id === reference.id);

              if (index === -1) {
                addresses.push([[i, j]]);
                seenDocs.push(reference.id);
                docs$.push(afs.doc(reference).valueChanges().pipe(populateBookReferenceFromObject(afs)) as Observable<Biomorph | Weapon>);
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
        map((data: (Biomorph | Weapon)[]) => {
          data.forEach((item, i) => {
            addresses[i].forEach((address: number[]) => {
              parent[category][address[0]].options[address[1]].reference = item;
            });
          });

          return parent;
        }),
      );
    })
  )
);

// const populateBiomorphReferencesFromUnit = (afs: AngularFirestore) => (
//   (source: Observable<Unit>) => (
//     defer(() => {
//       let parent: Unit;

//       return source.pipe(
//         switchMap((data: Unit) => {
//           parent = new Unit(data);

//           return getDocsFromReferences(afs, parent.biomorphs.map((value) => value.reference) as DocumentReference[]);
//         }),
//         map((data: Biomorph[]) => {
//           data.forEach((biomorph, i) => {
//             parent.biomorphs[i].reference = biomorph;
//           });

//           return parent;
//         }),
//       );
//     })
//   )
// );

const populateSharedAbilityReferencesFromUnit = (afs: AngularFirestore) => (
  (source: Observable<Unit>) => (
    defer(() => {
      let parent: Unit;

      return source.pipe(
        switchMap((data: typeof parent) => {
          parent = new Unit(data);

          return getDocsFromReferences(afs, parent.abilitiesShared as DocumentReference[]);
        }),
        map((data: Ability[]) => {
          data.forEach((ability, i) => {
            parent.abilitiesShared[i] = ability;
          });

          return parent;
        }),
      );
    })
  )
);

export const populateBookReferencesFromList = (afs: AngularFirestore) => {
  type Source = {
    book: { reference: Book | DocumentReference },
    name: string,
    variant?: string,
  }[];

  return (source: Observable<Source>) => (
    defer(() => {
      let parent: Source;

      return source.pipe(
        switchMap((data: typeof parent) => {
          parent = data;

          const references = parent.map((value) => value.book.reference) as DocumentReference[];
          const docs$: Observable<Book>[] = [];

          references.forEach((reference) => {
            docs$.push(afs.doc<Book>(reference).valueChanges());
          });

          if (docs$.length === 0) {
            return new BehaviorSubject([]);
          }

          return combineLatest(docs$);
        }),
        map((data: Book[]) => {
          data.forEach((book, i) => {
            parent[i].book.reference = book;
          });

          return parent.sort(compareByVariantName);
        }),
      );
    })
  );
};

// export const populateUnitData = (afs: AngularFirestore) => (
//   (source: Observable<Unit>) => (
//     defer(() => (
//       source.pipe(
//         populateOptionArrayReferencesFromUnit(afs, 'biomorphsLimited'),
//         populateOptionArrayReferencesFromUnit(afs, 'weapons'),
//         populateOptionArrayReferencesFromUnit(afs, 'weaponsLimited'),
//         populateBiomorphReferencesFromUnit(afs),
//         populateBookReferenceFromObject(afs),
//         populateSharedAbilityReferencesFromUnit(afs),
//       )
//     ))
//   )
// );

// export const populateUnitDataFromList = (afs: AngularFirestore) => (
//   (source: Observable<Unit[]>) => (
//     defer(() => {
//       const addresses: {
//         abilities: number[][],
//         biomorphs: number[][],
//         biomorphsLimited: number[][],
//         weapons: number[][],
//         weaponsLimited: number[][],
//       } = {
//         abilities: [],
//         biomorphs: [],
//         biomorphsLimited: [],
//         weapons: [],
//         weaponsLimited: [],
//       };

//       let parent: Unit[];

//       return source.pipe(
//         switchMap((data: typeof parent) => {
//           parent = data;

//           const docs$: Observable<Ability | Biomorph | Weapon>[] = [];
//           const seenDocs: {
//             abilities: {
//               id: string,
//               index: number,
//             }[],
//             biomorphs: {
//               id: string,
//               index: number,
//             }[],
//             weapons: {
//               id: string,
//               index: number,
//             }[],
//           } = {
//             abilities: [],
//             biomorphs: [],
//             weapons: [],
//           };

//           parent.forEach((unit, index) => {
//             if (unit.abilitiesShared) {
//               getDocsAndAddressesFromReferences(
//                 afs,
//                 index,
//                 'abilities',
//                 (unit.abilitiesShared as DocumentReference[]),
//                 addresses,
//                 seenDocs,
//                 docs$
//               );
//             }

//             if (unit.biomorphs) {
//               getDocsAndAddressesFromReferences(
//                 afs,
//                 index,
//                 'biomorphs',
//                 (unit.biomorphs.map(value => value.reference) as DocumentReference[]),
//                 addresses,
//                 seenDocs,
//                 docs$
//               );
//             }

//             if (unit.biomorphsLimited) {
//               getDocsAndAddressesFromOptionsArray(
//                 afs,
//                 index,
//                 'biomorphsLimited',
//                 'biomorphs',
//                 unit.biomorphsLimited.map(value => value.options.map(option => option.reference) as DocumentReference[]),
//                 addresses,
//                 seenDocs,
//                 docs$,
//               );
//             }

//             if (unit.weapons) {
//               getDocsAndAddressesFromOptionsArray(
//                 afs,
//                 index,
//                 'weapons',
//                 'weapons',
//                 unit.weapons.map(value => value.options.map(option => option.reference) as DocumentReference[]),
//                 addresses,
//                 seenDocs,
//                 docs$,
//               );
//             }

//             if (unit.weaponsLimited) {
//               getDocsAndAddressesFromOptionsArray(
//                 afs,
//                 index,
//                 'weaponsLimited',
//                 'weapons',
//                 unit.weaponsLimited.map(value => value.options.map(option => option.reference) as DocumentReference[]),
//                 addresses,
//                 seenDocs,
//                 docs$,
//               );
//             }
//           });

//           if (docs$.length === 0) {
//             return new BehaviorSubject([]);
//           }

//           return combineLatest(docs$);
//         }),
//         map((data: (Ability | Biomorph | Weapon)[]) => {
//           addresses.abilities.forEach((address) => {
//             parent[address[0]].abilitiesShared[address[1]] = data[address[2]] as Ability;
//           });
//           addresses.biomorphs.forEach((address) => {
//             parent[address[0]].biomorphs[address[1]].reference = data[address[2]] as Biomorph;
//           });
//           addresses.biomorphsLimited.forEach((address) => {
//             parent[address[0]].biomorphsLimited[address[1]].options[address[2]].reference = data[address[3]] as Biomorph;
//           });
//           addresses.weapons.forEach((address) => {
//             parent[address[0]].weapons[address[1]].options[address[2]].reference = data[address[3]] as Weapon;
//           });
//           addresses.weaponsLimited.forEach((address) => {
//             parent[address[0]].weaponsLimited[address[1]].options[address[2]].reference = data[address[3]] as Weapon;
//           });

//           return parent;
//         }),
//         populateBookReferencesFromList(afs),
//       );
//     })
//   )
// );
