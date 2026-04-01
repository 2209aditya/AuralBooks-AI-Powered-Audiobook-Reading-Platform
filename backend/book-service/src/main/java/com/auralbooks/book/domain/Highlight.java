package com.auralbooks.book.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class Highlight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookId;
    private String text;
    private String color;
}