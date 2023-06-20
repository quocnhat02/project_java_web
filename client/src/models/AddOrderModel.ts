class AddOrderModel {
  userEmail?: string;
  name: string;
  phoneNumber: string;
  address: string;
  listBookId: number[];

  constructor(
    userEmail: string,
    name: string,
    phoneNumber: string,
    address: string,
    listBookId: number[]
  ) {
    this.userEmail = userEmail;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.listBookId = listBookId;
  }
}

export default AddOrderModel;
