package com.nhom17books.booksapp.requestmodels;

import lombok.Data;
import java.util.List;

@Data
public class AddOrder {
    private String userEmail;
    private String name;
    private String address;
    private String phoneNumber;
    private List<Long> listBookId;
}
