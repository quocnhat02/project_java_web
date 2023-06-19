class OrderItemModel {
  id: number;
  name: string;
  orderDate: string;
  phoneNumber: string;
  address: string;
  total: number;
  userEmail?: string;

  constructor(
    id: number,
    name: string,
    orderDate: string,
    phoneNumber: string,
    address: string,
    total: number,
    userEmail: string
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.name = name;
    this.orderDate = orderDate;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.total = total;
  }
}

export default OrderItemModel;
