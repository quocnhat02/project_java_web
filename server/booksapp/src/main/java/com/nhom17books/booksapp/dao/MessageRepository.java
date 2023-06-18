package com.nhom17books.booksapp.dao;

import com.nhom17books.booksapp.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findByUserEmail(@RequestParam("user_email") String userEmail, Pageable pageable);
}
