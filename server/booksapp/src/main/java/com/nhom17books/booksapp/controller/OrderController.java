package com.nhom17books.booksapp.controller;

import com.nhom17books.booksapp.entity.Message;
import com.nhom17books.booksapp.requestmodels.AddOrder;
import com.nhom17books.booksapp.service.OrderService;
import com.nhom17books.booksapp.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/orders")

public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @PostMapping("/secure/add/order")
    public void postMessage(@RequestHeader(value = "Authorization") String token, @RequestBody AddOrder newOrder){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        orderService.postOder(userEmail, newOrder);
    }

}
