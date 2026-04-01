package com.auralbooks.chat.service;

import com.auralbooks.chat.domain.Group;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GroupService {

    private final Map<String, Group> groups = new HashMap<>();

    public Group createGroup(String name) {
        Group g = new Group();
        g.setId(UUID.randomUUID().toString());
        g.setName(name);
        groups.put(g.getId(), g);
        return g;
    }
}