export default class Book {
  name: string;

  constructor(book?: Partial<Book>) {
    const init = {
      name: 'Codex: Tyranids',
      ...book,
    };

    Object.assign(this, init);
  }
}