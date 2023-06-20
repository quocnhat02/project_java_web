package com.nhom17books.booksapp.service;

import com.nhom17books.booksapp.dao.BookRepository;
import com.nhom17books.booksapp.dao.OrderDetailsRepository;
import com.nhom17books.booksapp.dao.OrderRepository;
import com.nhom17books.booksapp.entity.Book;
import com.nhom17books.booksapp.entity.Order;
import com.nhom17books.booksapp.entity.OrderDetails;
import com.nhom17books.booksapp.requestmodels.AddOrder;
import org.aspectj.weaver.ast.Or;
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

    public List<Book> getAllOrderDetails(Long orderId){
        List<Book> listBook = new ArrayList<Book>();
        List<OrderDetails> listOrderDetails = this.orderDetailsRepository.findOrderDetailsByOrderId(orderId);
        for(int i = 0; i < listOrderDetails.size(); i++){
            Optional<Book> findBook = bookRepository.findById(listOrderDetails.get(i).getBookId());
            Book book = new Book();
            book.setId(findBook.get().getId());
            book.setCopies(findBook.get().getCopies());
            book.setCopiesAvailable(findBook.get().getCopiesAvailable());
            book.setImg(findBook.get().getImg());
            book.setCategory(findBook.get().getCategory());
            book.setDescription(findBook.get().getDescription());
            book.setAuthor(findBook.get().getAuthor());
            book.setPrice(findBook.get().getPrice());
            book.setTitle(findBook.get().getTitle());
            listBook.add(book);
        }
        return listBook;
    }

    public void postOder(String userEmail, AddOrder order) {
        List<Book> listBook = new ArrayList<Book>();
        List<Long> listBookId = new ArrayList<Long>();
        listBookId = order.getListBookId();
        Long total = 0L;
        for(int i = 0; i < listBookId.size(); i++){
            Optional<Book> book = bookRepository.findById(listBookId.get(i));
            total = total + book.get().getPrice();
            book.get().setCopies(book.get().getCopies() - 1);
            book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        }
        Order newOrder = new Order();
        newOrder.setOrderDate(LocalDate.now().toString());
        newOrder.setUserEmail(userEmail);
        newOrder.setName(order.getName());
        newOrder.setAddress(order.getAddress());
        newOrder.setTotal(total);
        newOrder.setPhoneNumber(order.getPhoneNumber());
        newOrder.setStatus(1);
        orderRepository.save(newOrder);
        for (int i = 0; i < listBookId.size(); i++){
            OrderDetails newOrderDetails = new OrderDetails();
            newOrderDetails.setOrderId(newOrder.getId());
            newOrderDetails.setQuantity(1);
            newOrderDetails.setBookId(listBookId.get(i));
            orderDetailsRepository.save(newOrderDetails);
        }
    }

    public void changeStatus(Long orderId, Integer status) {
        Optional<Order> findOrder = orderRepository.findById(orderId);
        Order order = new Order();
        order.setStatus(status);
        order.setOrderDate(findOrder.get().getOrderDate());
        order.setId(findOrder.get().getId());
        order.setName(findOrder.get().getName());
        order.setTotal(findOrder.get().getTotal());
        order.setAddress(findOrder.get().getAddress());
        order.setUserEmail(findOrder.get().getUserEmail());
        order.setPhoneNumber(findOrder.get().getPhoneNumber());
        orderRepository.save(order);
    }

}
