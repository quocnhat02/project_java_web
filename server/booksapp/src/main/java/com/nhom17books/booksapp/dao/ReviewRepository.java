package com.nhom17books.booksapp.dao;

import com.nhom17books.booksapp.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByBookId(@RequestParam("book_id") Long bookId, Pageable pageable);
}
