class CartItemModel {
  id: number;
  title: string;
  author?: string;
  description?: string;
  category?: string;
  price?: string;
  img?: string;

  constructor(
    id: number,
    title: string,
    author: string,
    description: string,
    category: string,
    price: string,
    img: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.category = category;
    this.price = price;
    this.img = img;
  }
}

export default CartItemModel;
