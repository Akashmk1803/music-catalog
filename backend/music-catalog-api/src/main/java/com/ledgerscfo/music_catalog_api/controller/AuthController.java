package com.ledgerscfo.music_catalog_api.controller;

import com.ledgerscfo.music_catalog_api.dto.AuthResponse;
import com.ledgerscfo.music_catalog_api.dto.LoginRequest;
import com.ledgerscfo.music_catalog_api.dto.RegisterRequest;
import com.ledgerscfo.music_catalog_api.entity.User;
import com.ledgerscfo.music_catalog_api.service.JwtService;
import com.ledgerscfo.music_catalog_api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService,
                          JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {

        User user = userService.register(request);

        return ResponseEntity.ok(
                new AuthResponse("User registered successfully")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        User user = userService.login(request);

        String token = jwtService.generateToken(user.getEmail());

        return ResponseEntity.ok(
                new AuthResponse(
                        "Login successful",
                        token
                )
        );
    }
}