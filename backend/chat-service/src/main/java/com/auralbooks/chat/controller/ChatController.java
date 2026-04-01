package com.auralbooks.chat.controller;

import com.auralbooks.chat.domain.Message;
import com.auralbooks.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public Message send(Message message) {
        return chatService.processMessage(message);
    }
}