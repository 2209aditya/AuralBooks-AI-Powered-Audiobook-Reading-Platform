package com.auralbooks.chat.domain;

import lombok.*;

import java.util.List;

@Getter
@Setter
public class Group {
    private String id;
    private String name;
    private List<String> members;
}