package com.easysoul.easesoul_server.controller;

import com.easysoul.easesoul_server.dto.*;
import com.easysoul.easesoul_server.email.EmailService;
import com.easysoul.easesoul_server.model.Token;
import com.easysoul.easesoul_server.model.User;
import com.easysoul.easesoul_server.security.UserDetailsImpl;
import com.easysoul.easesoul_server.service.AuthService;
import com.easysoul.easesoul_server.service.JwtTokenProvider;
import com.easysoul.easesoul_server.service.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController

@RequestMapping("/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

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
            // Additional validation for psychologists
            if ("PSYCHOLOGIST".equals(registerRequest.getRole())) {
                if (registerRequest.getLicenseNumber() == null || registerRequest.getLicenseNumber().isEmpty()) {
                    return ResponseEntity.badRequest().body("License number is required for psychologists.");
                }
                if (registerRequest.getSpecialization() == null || registerRequest.getSpecialization().isEmpty()) {
                    return ResponseEntity.badRequest().body("Specialization is required for psychologists.");
                }
            }

            User user = authService.register(registerRequest);

            // Create activation token and send activation email
            Token activationToken = tokenService.createToken(user);
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

            // Get user details
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            // Check if the user is disabled
            if (!userDetails.isEnabled()) {
                return ResponseEntity.badRequest().body("Your account is disabled. Please contact support.");
            }

            // Generate JWT token
            String jwt = jwtTokenProvider.generateToken(authentication);

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
            // Log error and return a more general message
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
    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody ForgotPasswordRequestDto forgotPasswordRequest) {
        authService.requestPasswordReset(forgotPasswordRequest.getEmail());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password reset link sent to your email.");
        return ResponseEntity.ok(response);
    }


    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordRequestDto resetPasswordRequest
    ) {
        // Detailed logging
        logger.info("Reset password endpoint called");
        logger.info("Request body: {}", resetPasswordRequest);

        // Validate input
        if (resetPasswordRequest == null) {
            logger.error("Received null reset password request");
            return ResponseEntity.badRequest().body("Invalid reset request");
        }

        // Additional null checks
        if (StringUtils.isEmpty(resetPasswordRequest.getToken())) {
            logger.error("Token is missing");
            return ResponseEntity.badRequest().body("Token is required");
        }

        if (StringUtils.isEmpty(resetPasswordRequest.getNewPassword())) {
            logger.error("New password is missing");
            return ResponseEntity.badRequest().body("New password is required");
        }

        try {
            authService.resetPassword(
                    resetPasswordRequest.getToken(),
                    resetPasswordRequest.getNewPassword()
            );
            return ResponseEntity.ok("Password reset successfully.");
        } catch (Exception e) {
            logger.error("Password reset error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to reset password: " + e.getMessage());
        }
    }
    //Logout Endpoint
    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        // Call the logout method from AuthService
        String result = authService.logout();

        // Return the result from the AuthService
        if (result.equals("Logged out successfully.")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(500).body(result);
        }
    }
    @PostMapping("/resend-activation-link")
    public ResponseEntity<String> resendActivationLink(@RequestBody ResendActivationRequestDto resendActivationRequest) {
        authService.resendActivationEmail(resendActivationRequest.getEmail());
        return ResponseEntity.ok("Activation link sent to your email.");
    }

}
