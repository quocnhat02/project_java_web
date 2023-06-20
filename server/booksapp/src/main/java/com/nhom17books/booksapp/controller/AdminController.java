package com.nhom17books.booksapp.controller;

import com.nhom17books.booksapp.entity.Book;
import com.nhom17books.booksapp.entity.Order;
import com.nhom17books.booksapp.entity.OrderDetails;
import com.nhom17books.booksapp.requestmodels.AddBookRequest;
import com.nhom17books.booksapp.service.AdminService;
import com.nhom17books.booksapp.service.OrderService;
import com.nhom17books.booksapp.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    private OrderService orderService;

    private

    @Autowired AdminController(AdminService adminService, OrderService orderService){
        this.adminService = adminService;
        this.orderService = orderService;
    }


    @GetMapping("/secure/get/listorder")
    public List<Order> getListOrder(@RequestHeader(value = "Authorization") String token) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Bạn không được phép truy cập vào trang này");
        }
        return orderService.getAllOrder();
    }

    @GetMapping("/secure/get/order/details")
    public List<Book> getListOrderDetails(@RequestHeader(value = "Authorization") String token, @RequestParam Long orderId) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Bạn không được phép truy cập vào trang này");
        }
        return orderService.getAllOrderDetails(orderId);
    }

    @PutMapping("/secure/changestatus/order")
    public void changeStatus(@RequestHeader(value = "Authorization") String token, @RequestParam Long orderId, @RequestParam Integer status) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Bạn không được phép truy cập vào trang này");
        }
        orderService.changeStatus(orderId, status);
    }
    
    //Tăng copies available
    @PutMapping("/secure/increase/book/available")
    public void increaseBookAvailable(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Bạn không được phép truy cập vào trang này");
        }
        adminService.increaseBookAvailable(bookId);
    }

    @PutMapping("/secure/increase/book/quantity")
    public void increaseBookQuantity(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Bạn không được phép truy cập vào trang này");
        }
        adminService.increaseBookQuantity(bookId);
    }

    @PutMapping("/secure/decrease/book/quantity")
    public void decreaseBookQuantity(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Bạn không được phép truy cập vào trang này");
        }
        adminService.decreaseBookQuantity(bookId);
    }

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value = "Authorization") String token, @RequestBody AddBookRequest addBookRequest) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Bạn không được phép truy cập vào trang này");
        }
        adminService.postBook(addBookRequest);
    }

    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Bạn không được phép truy cập vào trang này");
        }
        adminService.deleteBook(bookId);
    }
}
