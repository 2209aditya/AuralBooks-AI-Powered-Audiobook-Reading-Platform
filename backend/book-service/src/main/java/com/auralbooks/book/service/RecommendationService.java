package com.auralbooks.book.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    public List<String> recommend(String userId) {
        return List.of("Atomic Habits", "Deep Work", "Clean Code");
    }
}