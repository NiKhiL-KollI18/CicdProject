package com.FSP.BackEnd.controller;

import com.FSP.BackEnd.model.UserEntity;
import com.FSP.BackEnd.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "*") // <-- THE FIX: Add this line
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) { this.userService = userService; }
    
    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody UserEntity user) {
        if(userService.existsByEmail(user.getEmail())) {
            return Map.of("status", "error", "message", "Email already exists!");
        }
        userService.saveUser(user);
        return Map.of("status", "success", "message", "Signup successful!");
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody UserEntity user) {
        return userService.findByEmail(user.getEmail())
                .filter(u -> u.getPassword().equals(user.getPassword()))
                .map(u -> Map.of("status", "success", "message", "Login successful!"))
                .orElse(Map.of("status", "error", "message", "Invalid email or password"));
    }
}

