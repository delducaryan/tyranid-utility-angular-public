import { DocumentReference } from '@angular/fire/firestore';
import Book from './book';

export default class Ability {
  book: {
    page: number,
    reference: Book | DocumentReference,
  };
  description: string;
  name: string;

  constructor(ability?: Partial<Ability>) {
    const init = {
      book: new Book(),
      description: '',
      name: 'New Ability',
      ...ability,
    };

    Object.assign(this, init);
  }
}
