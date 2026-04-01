package com.auralbooks.book.service;

import com.auralbooks.book.domain.Highlight;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HighlightService {

    public Highlight createHighlight(Long bookId, String text, String color) {
        Highlight h = new Highlight();
        h.setBookId(bookId);
        h.setText(text);
        h.setColor(color);
        return h;
    }
}