import { DocumentReference } from '@angular/fire/firestore';
import Book from './book';

export default class Weapon {
  ammunition: number;
  armourPenetration: number;
  book: {
    page: number,
    reference: Book | DocumentReference,
  };
  damage: number;
  id: string;
  name: string;
  points: number;
  range: number;
  strength: number;
  type: string;
  variant?: string;

  constructor(weapon?: Weapon) {
    const init = {
      ammunition: 1,
      armourPenetration: 0,
      book: new Book(),
      damage: 1,
      id: '',
      name: 'New Weapon',
      points: 0,
      range: 12,
      strength: 4,
      type: 'Assault',
      variant: '',
      ...weapon,
    };

    Object.assign(this, init);
  }
}
