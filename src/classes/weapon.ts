import Book from './book';

export default class Weapon {
  ammunition: number;
  armourPenetration: number;
  book: Book;
  damage: number;
  name: string;
  points: number;
  range: number;
  strength: number;
  type: string;

  constructor(weapon?: Partial<Weapon>) {
    const init = {
      ammunition: 1,
      armourPenetration: 0,
      book: new Book(),
      damage: 1,
      name: 'New Weapon',
      points: 0,
      range: 12,
      strength: 4,
      type: 'Assault',
      ...weapon,
    };

    Object.assign(this, init);
  }
}
