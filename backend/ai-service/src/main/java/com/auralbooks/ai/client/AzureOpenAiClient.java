package com.auralbooks.ai.client;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class AzureOpenAiClient {

    private final WebClient.Builder webClientBuilder;

    @Value("${azure.openai.endpoint}")
    private String endpoint;

    @Value("${azure.openai.key}")
    private String apiKey;

    public String askGpt(String prompt) {
        return webClientBuilder.build()
                .post()
                .uri(endpoint + "/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview")
                .header("api-key", apiKey)
                .bodyValue("""
                        {
                          "messages": [
                            {"role": "system", "content": "You are an AI reading assistant."},
                            {"role": "user", "content": "%s"}
                          ]
                        }
                        """.formatted(prompt))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}