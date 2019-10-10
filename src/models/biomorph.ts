import { DocumentReference } from '@angular/fire/firestore';
import { VariantName } from 'src/interfaces/models';
import Book from './book';

export default class Biomorph implements VariantName {
  book: {
    page: number,
    reference: Book | DocumentReference,
  };
  description: string;
  id: string;
  name: string;
  points: number;
  variant?: string;

  constructor(biomorph?: Biomorph) {
    const init = {
      book: new Book(),
      description: '',
      id: '',
      name: 'New Biomorph',
      points: 1,
      variant: '',
      ...biomorph,
    };

    Object.assign(this, init);
  }
}
