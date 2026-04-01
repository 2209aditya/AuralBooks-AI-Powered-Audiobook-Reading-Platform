package com.auralbooks.user.controller;

import com.auralbooks.user.domain.User;
import com.auralbooks.user.security.JwtTokenProvider;
import com.auralbooks.user.security.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository repository;
    private final JwtTokenProvider jwt;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return repository.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User dbUser = repository.findByUsername(user.getUsername())
                .orElseThrow();

        if (!dbUser.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwt.generateToken(user.getUsername());
    }
}