package com.revature.practice.service;

import com.revature.practice.dto.BookRequestDTO;
import com.revature.practice.exception.ResourceNotFoundException;
import com.revature.practice.model.Book;
import com.revature.practice.repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks(String author, String genre) {
        if (author != null && genre != null) {
            return bookRepository.findByAuthorIgnoreCaseAndGenreIgnoreCaseOrderByIdAsc(author, genre);
        } else if (author != null) {
            return bookRepository.findByAuthorIgnoreCaseOrderByIdAsc(author);
        } else if (genre != null) {
            return bookRepository.findByGenreIgnoreCaseOrderByIdAsc(genre);
        }
        return bookRepository.findAllByOrderByIdAsc();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
    }

    @Transactional
    public Book createBook(BookRequestDTO request) {
        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setGenre(request.getGenre());
        book.setPages(request.getPages());
        book.setPublishedYear(request.getPublishedYear());
        return bookRepository.save(book);
    }
}
