package com.nhom17books.booksapp.dao;

import com.nhom17books.booksapp.entity.Book;
import com.nhom17books.booksapp.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {

    @Query("select o from OrderDetails o where o.orderId = :order_id")
    List<OrderDetails> findOrderDetailsByOrderId (@Param("order_id") Long orderId);
}
