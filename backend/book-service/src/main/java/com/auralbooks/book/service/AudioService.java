package com.auralbooks.book.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class AudioService {

    private final WebClient.Builder webClientBuilder;

    public byte[] generateAudio(String text) {
        return webClientBuilder.build()
                .post()
                .uri("http://ai-service/api/v1/ai/tts")
                .bodyValue(text)
                .retrieve()
                .bodyToMono(byte[].class)
                .block();
    }
}