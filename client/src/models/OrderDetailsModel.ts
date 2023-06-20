import BookModel from './BookModel';

class OrderDetailsModel {
  book: BookModel;
  orderId: number;

  constructor(book: BookModel, orderId: number) {
    this.book = book;
    this.orderId = orderId;
  }
}

export default OrderDetailsModel;
