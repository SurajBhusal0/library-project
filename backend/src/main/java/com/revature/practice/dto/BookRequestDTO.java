package com.revature.practice.dto;

import jakarta.validation.constraints.*;

public class BookRequestDTO {

    @NotBlank(message = "Title is required")
    @Size(max = 300, message = "Title must not exceed 300 characters")
    private String title;

    @NotBlank(message = "Author is required")
    @Size(max = 200, message = "Author must not exceed 200 characters")
    private String author;

    @NotBlank(message = "Genre is required")
    @Size(max = 100, message = "Genre must not exceed 100 characters")
    private String genre;

    @NotNull(message = "Pages is required")
    @Min(value = 1, message = "Pages must be at least 1")
    private Integer pages;

    @NotNull(message = "Published year is required")
    @Min(value = 1, message = "Published year must be a positive number")
    @Max(value = 2026, message = "Published year cannot be in the future")
    private Integer publishedYear;

    public BookRequestDTO() {
    }

    public BookRequestDTO(String title, String author, String genre, Integer pages, Integer publishedYear) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.publishedYear = publishedYear;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public Integer getPublishedYear() {
        return publishedYear;
    }

    public void setPublishedYear(Integer publishedYear) {
        this.publishedYear = publishedYear;
    }
}
