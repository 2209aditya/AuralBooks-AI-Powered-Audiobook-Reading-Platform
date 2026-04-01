package com.auralbooks.chat.service;

import com.auralbooks.chat.domain.Message;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    public Message processMessage(Message message) {
        // future: AI moderation, filtering
        return message;
    }
}