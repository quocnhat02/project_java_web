package com.nhom17books.booksapp.dao;

import com.nhom17books.booksapp.entity.Order;
import com.nhom17books.booksapp.entity.OrderDetails;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("select o from Order o where o.userEmail = :user_email")
    List<Order> findOrderByUserEmail (@Param("user_email") String userEmail);
}
