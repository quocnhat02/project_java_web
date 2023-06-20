package com.nhom17books.booksapp.service;

import com.nhom17books.booksapp.dao.BookRepository;
import com.nhom17books.booksapp.dao.CheckoutRepository;
import com.nhom17books.booksapp.dao.ReviewRepository;
import com.nhom17books.booksapp.entity.Book;
import com.nhom17books.booksapp.requestmodels.AddBookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {
    private BookRepository bookRepository;
    private ReviewRepository reviewRepository;
    private CheckoutRepository checkoutRepository;

    @Autowired
    public AdminService(BookRepository bookRepository, ReviewRepository reviewRepository, CheckoutRepository checkoutRepository){
        this.bookRepository = bookRepository;
        this.reviewRepository = reviewRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public void increaseBookQuantity(Long bookId) throws Exception{
        Optional<Book> book = bookRepository.findById(bookId);

        if (!book.isPresent()){
            throw new Exception("Không tìm thấy sách");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        book.get().setCopies(book.get().getCopies() + 1);

        bookRepository.save(book.get());
    }

    public void increaseBookAvailable(Long bookId) throws Exception{
        Optional<Book> book = bookRepository.findById(bookId);

        if (!book.isPresent()){
            throw new Exception("Không tìm thấy sách");
        }

        if(book.get().getCopies() > book.get().getCopiesAvailable())
            book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);

        bookRepository.save(book.get());
    }

    public void decreaseBookQuantity(Long bookId) throws Exception{
        Optional<Book> book = bookRepository.findById(bookId);

        if (!book.isPresent() || book.get().getCopiesAvailable() <= 0 || book.get().getCopies() <= 0){
            throw new Exception("Không tìm thấy sách hoặc số lượng đã bị khóa");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        book.get().setCopies(book.get().getCopies() - 1);

        bookRepository.save(book.get());
    }

    public void postBook(AddBookRequest addBookRequest){
        Book book = new Book();
        book.setTitle(addBookRequest.getTitle());
        book.setAuthor(addBookRequest.getAuthor());
        book.setDescription(addBookRequest.getDescription());
        book.setCopies(addBookRequest.getCopies());
        book.setCopiesAvailable(addBookRequest.getCopies());
        book.setCategory(addBookRequest.getCategory());
        book.setImg(addBookRequest.getImg());
        book.setPrice(addBookRequest.getPrice());
        bookRepository.save(book);
    }

    public void deleteBook(Long bookId) throws Exception{
        Optional<Book> book = bookRepository.findById(bookId);

        if (!book.isPresent()){
            throw new Exception("Không tìm thấy sách");
        }

        bookRepository.delete(book.get());
        checkoutRepository.deleteAllByBookId(bookId);
        reviewRepository.deleteAllByBookId(bookId);
    }

}
