package com.nhom17books.booksapp.requestmodels;

import lombok.Data;

@Data
public class AddBookRequest {
    private String title;
    private String author;
    private String description;
    private int copies;
    private String category;
    private String img;
    private Long price;
}
