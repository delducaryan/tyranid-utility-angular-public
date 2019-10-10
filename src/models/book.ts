export default class Book {
  id: string;
  name: string;

  constructor(book?: Partial<Book>) {
    const init = {
      id: '',
      name: 'Codex: Tyranids',
      ...book,
    };

    Object.assign(this, init);
  }
}