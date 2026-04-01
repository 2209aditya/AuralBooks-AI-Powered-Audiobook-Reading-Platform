package com.auralbooks.event.controller;

import com.auralbooks.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    public String publish(@RequestParam String type,
                          @RequestBody String payload) {

        eventService.publishEvent(type, payload);
        return "Event published";
    }
}