package com.nhom17books.booksapp.service;

import com.nhom17books.booksapp.dao.BookRepository;
import com.nhom17books.booksapp.dao.OrderDetailsRepository;
import com.nhom17books.booksapp.dao.OrderRepository;
import com.nhom17books.booksapp.entity.Book;
import com.nhom17books.booksapp.entity.Order;
import com.nhom17books.booksapp.entity.OrderDetails;
import com.nhom17books.booksapp.requestmodels.AddOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService {

    private OrderRepository orderRepository;

    private OrderDetailsRepository orderDetailsRepository;

    private BookRepository bookRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository, BookRepository bookRepository){
        this.orderRepository = orderRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.bookRepository = bookRepository;
    }

    public List<Order> getAllOrder(){
        return this.orderRepository.findAll();
    }

    public List<OrderDetails> getAllOrderDetails(Long orderId){
        return this.orderDetailsRepository.findOrderDetailsByOrderId(orderId);
    }

    public void postOder(String userEmail, AddOrder order) {
        List<Book> listBook = new ArrayList<Book>();
        List<Long> listBookId = new ArrayList<Long>();
        listBookId = order.getListBookId();
        Long total = 0l;
        for(int i = 0; i < listBookId.size(); i++){
            Optional<Book> book = bookRepository.findById(listBookId.get(i));
            total = Long.valueOf(total + book.get().getPrice());
        }
        Order newOrder = new Order();
        newOrder.setOrderDate(LocalDate.now().toString());
        newOrder.setUserEmail(userEmail);
        newOrder.setName(order.getName());
        newOrder.setAddress(order.getAddress());
        newOrder.setTotal(total);
        newOrder.setPhoneNumber(order.getPhoneNumber());
        orderRepository.save(newOrder);
        for (int i = 0; i < listBookId.size(); i++){
            OrderDetails newOrderDetails = new OrderDetails();
            newOrderDetails.setOrderId(newOrder.getId());
            newOrderDetails.setQuantity(1);
            newOrderDetails.setBookId(listBookId.get(i));
            orderDetailsRepository.save(newOrderDetails);
        }
    }

}
