class AddBookRequest {
  title: string;
  author: string;
  description: string;
  copies: number;
  category: string;
  img?: string;
  price?: number;

  constructor(
    title: string,
    author: string,
    description: string,
    copies: number,
    category: string,
    price: number
  ) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.copies = copies;
    this.category = category;
    this.price = price;
  }
}

export default AddBookRequest;
