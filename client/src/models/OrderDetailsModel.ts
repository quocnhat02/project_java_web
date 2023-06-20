class OrderDetailsModel {
  id: number;
  bookId: number;
  orderId: number;
  quantity: number;

  constructor(id: number, bookId: number, orderId: number, quantity: number) {
    this.id = id;
    this.bookId = bookId;
    this.orderId = orderId;
    this.quantity = quantity;
  }
}

export default OrderDetailsModel;
