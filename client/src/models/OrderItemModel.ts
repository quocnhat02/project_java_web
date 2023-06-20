class OrderItemModel {
  id: number;
  name: string;
  orderDate: string;
  phoneNumber: string;
  address: string;
  total: number;
  userEmail?: string;
  status?: number;

  constructor(
    id: number,
    name: string,
    orderDate: string,
    phoneNumber: string,
    address: string,
    total: number,
    userEmail: string,
    status: number
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.name = name;
    this.orderDate = orderDate;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.total = total;
    this.status = status;
  }
}

export default OrderItemModel;
