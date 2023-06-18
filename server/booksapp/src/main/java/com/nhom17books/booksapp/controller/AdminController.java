package com.nhom17books.booksapp.controller;

import com.nhom17books.booksapp.requestmodels.AddBookRequest;
import com.nhom17books.booksapp.service.AdminService;
import com.nhom17books.booksapp.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value = "Authorization") String token, @RequestBody AddBookRequest addBookRequest) throws Exception{
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Bạn không được phép truy cập vào trang này");
        }
        adminService.postBook(addBookRequest);
    }
}
