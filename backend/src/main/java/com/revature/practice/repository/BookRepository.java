package com.revature.practice.repository;

import com.revature.practice.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByAuthorIgnoreCaseOrderByIdAsc(String author);

    List<Book> findByGenreIgnoreCaseOrderByIdAsc(String genre);

    List<Book> findByAuthorIgnoreCaseAndGenreIgnoreCaseOrderByIdAsc(String author, String genre);

    List<Book> findAllByOrderByIdAsc();
}
