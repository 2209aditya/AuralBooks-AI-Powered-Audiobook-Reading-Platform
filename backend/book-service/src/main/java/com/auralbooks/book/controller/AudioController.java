package com.auralbooks.book.controller;

import com.auralbooks.book.service.AudioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/audio")
@RequiredArgsConstructor
public class AudioController {

    private final AudioService service;

    @PostMapping
    public ResponseEntity<byte[]> generate(@RequestBody String text) {
        return ResponseEntity.ok(service.generateAudio(text));
    }
}