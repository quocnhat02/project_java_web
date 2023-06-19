class AddOrderModel {
  userEmail?: string;
  name: string;
  phone: string;
  address: string;
  listBookId: number[];

  constructor(
    userEmail: string,
    name: string,
    phone: string,
    address: string,
    listBookId: number[]
  ) {
    this.userEmail = userEmail;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.listBookId = listBookId;
  }
}

export default AddOrderModel;
