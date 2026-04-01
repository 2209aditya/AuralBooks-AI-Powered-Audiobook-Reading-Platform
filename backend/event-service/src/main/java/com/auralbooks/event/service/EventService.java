package com.auralbooks.event.service;

import com.auralbooks.event.domain.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventConsumer {

    private final EventService eventService;

    @KafkaListener(topics = "auralbooks-events", groupId = "auralbooks-group")
    public void consume(Event event) {
        eventService.handleEvent(event);
    }
}