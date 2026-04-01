package com.auralbooks.event.domain;

import lombok.*;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    private String id;
    private String type;      // BOOK_CREATED, AUDIO_GENERATED, PAYMENT_SUCCESS
    private String payload;   // JSON string
    private Instant timestamp;
}