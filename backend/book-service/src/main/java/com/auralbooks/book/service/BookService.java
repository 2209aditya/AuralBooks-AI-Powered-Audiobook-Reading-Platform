package com.auralbooks.book.service;

import com.auralbooks.book.domain.Book;
import com.auralbooks.book.domain.BookRepository;
import com.auralbooks.book.dto.*;
import com.auralbooks.book.exception.BookNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository repository;
    private final RedisTemplate<String, Object> redisTemplate;

    public BookResponse create(CreateBookRequest request) {
        Book book = repository.save(Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .description(request.getDescription())
                .build());

        return map(book);
    }

    public BookResponse get(Long id) {
        String key = "book::" + id;

        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (BookResponse) cached;

        Book book = repository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));

        BookResponse response = map(book);
        redisTemplate.opsForValue().set(key, response);

        return response;
    }

    private BookResponse map(Book book) {
        return BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .description(book.getDescription())
                .audioUrl(book.getAudioUrl())
                .build();
    }
}