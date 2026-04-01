package com.auralbooks.user.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @GetMapping("/me")
    public String me() {
        return "Authenticated user data";
    }
}