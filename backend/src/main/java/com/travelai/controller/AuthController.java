package com.travelai.controller;

import com.travelai.model.User;
import com.travelai.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            return "User already exists";
        }

        userRepository.save(user);

        return "Signup successful";
    }


    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return "User not found";
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Wrong password";
        }

        return "Login successful";
    }
}
