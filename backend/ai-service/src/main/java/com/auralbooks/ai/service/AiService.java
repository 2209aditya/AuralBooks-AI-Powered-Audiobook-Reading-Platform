package com.auralbooks.ai.service;

import com.auralbooks.ai.client.AzureOpenAiClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiService {

    private final AzureOpenAiClient aiClient;

    public String askQuestion(String question, String context) {
        String prompt = """
                Context:
                %s

                Question:
                %s
                """.formatted(context, question);

        return aiClient.askGpt(prompt);
    }
}