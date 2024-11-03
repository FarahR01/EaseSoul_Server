package com.easysoul.easesoul_server.controller;
import org.springframework.security.core.GrantedAuthority;  // Added this import

import com.easysoul.easesoul_server.dto.JwtResponseDto;
import com.easysoul.easesoul_server.dto.LoginRequestDto;
import com.easysoul.easesoul_server.dto.RegisterRequestDto;
import com.easysoul.easesoul_server.email.EmailService;
import com.easysoul.easesoul_server.model.Token;
import com.easysoul.easesoul_server.model.User;
import com.easysoul.easesoul_server.security.UserDetailsImpl;
import com.easysoul.easesoul_server.service.AuthService;
import com.easysoul.easesoul_server.service.JwtTokenProvider;
import com.easysoul.easesoul_server.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;  // Correctly injecting the JWT token provider

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequestDto registerRequest) {
        try {
            User user = authService.register(registerRequest);

            // Create activation token
            Token activationToken = tokenService.createToken(user);

            // Send email with activation token
            emailService.sendActivationEmail(user.getEmail(), activationToken.getToken());

            return ResponseEntity.ok("User registered successfully. Check your email to activate your account.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Login endpoint
    // 1. First, modify AuthController.java
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDto loginRequest) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            // Set authentication to security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate JWT token
            String jwt = jwtTokenProvider.generateToken(authentication);

            // Get user details from authentication
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            // Return token and user details in response
            return ResponseEntity.ok(new JwtResponseDto(
                    jwt,
                    userDetails.getId(),
                    userDetails.getEmail(),
                    userDetails.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.toList())
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid email or password: " + e.getMessage());
        }
    }
    @GetMapping("/activate")
    public ResponseEntity<?> activateAccount(@RequestParam("token") String token) {
        try {
            // Validate the token
            tokenService.validateToken(token);

            // Get the user associated with the token
            Token activationToken = tokenService.findByToken(token).orElseThrow(() -> new RuntimeException("Invalid activation token"));
            User user = activationToken.getUser();

            // Activate the user's account
            user.setActive(true);
            authService.saveUser(user); // Assuming `saveUser()` is part of `AuthService`

            // Delete the token after activation
            tokenService.deleteToken(token);

            return ResponseEntity.ok("Account activated successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
