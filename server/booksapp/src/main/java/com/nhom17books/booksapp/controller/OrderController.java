package com.nhom17books.booksapp.controller;

import com.nhom17books.booksapp.entity.Message;
import com.nhom17books.booksapp.entity.Order;
import com.nhom17books.booksapp.requestmodels.AddOrder;
import com.nhom17books.booksapp.service.OrderService;
import com.nhom17books.booksapp.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public void postOrder(@RequestHeader(value = "Authorization") String token, @RequestBody AddOrder newOrder){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        orderService.postOrder(userEmail, newOrder);
    }

    @GetMapping("/secure/get/listorder")
    public List<Order> getListOrder(@RequestHeader(value = "Authorization") String token){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return orderService.getAllOrderByUserEmail(userEmail);
    }

}
