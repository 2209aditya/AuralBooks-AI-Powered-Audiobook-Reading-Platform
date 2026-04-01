package com.auralbooks.book.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class ReadingProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long bookId;
    private int page;
}