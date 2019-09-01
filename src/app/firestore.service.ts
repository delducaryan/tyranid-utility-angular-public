import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists,
} from 'angularfire2/firestore';
import {
  from,
  Observable,
} from 'rxjs';
import {
  expand,
  map,
  mergeMap,
  switchMap,
  take,
  takeWhile,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }
}
