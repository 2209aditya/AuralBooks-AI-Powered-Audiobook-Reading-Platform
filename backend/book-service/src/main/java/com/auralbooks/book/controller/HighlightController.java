package com.auralbooks.book.controller;

import com.auralbooks.book.service.HighlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/highlights")
@RequiredArgsConstructor
public class HighlightController {

    private final HighlightService service;

    @PostMapping
    public Object create(@RequestParam Long bookId,
                         @RequestParam String text,
                         @RequestParam String color) {
        return service.createHighlight(bookId, text, color);
    }
}