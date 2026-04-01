package com.auralbooks.book.controller;

import com.auralbooks.book.dto.*;
import com.auralbooks.book.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService service;

    @PostMapping
    public BookResponse create(@RequestBody CreateBookRequest request) {
        return service.create(request);
    }

    @GetMapping("/{id}")
    public BookResponse get(@PathVariable Long id) {
        return service.get(id);
    }
}