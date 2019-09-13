import { DocumentReference } from '@angular/fire/firestore';
import Book from './book';

export default class Biomorph {
  book: {
    page: number,
    reference: Book | DocumentReference,
  };
  description: string;
  name: string;
  points: number;
  variant: string;

  constructor(biomorph?: Partial<Biomorph>) {
    const init = {
      book: new Book(),
      description: '',
      name: 'New Biomorph',
      points: 1,
      variant: '',
      ...biomorph,
    };

    Object.assign(this, init);
  }
}
