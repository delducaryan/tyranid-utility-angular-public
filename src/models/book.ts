export default class Book {
  id?: string;
  name: string;

  constructor(book?: Partial<Book>) {
    const init = {
      name: '',
      ...book,
    };

    Object.assign(this, init);
  }
}
