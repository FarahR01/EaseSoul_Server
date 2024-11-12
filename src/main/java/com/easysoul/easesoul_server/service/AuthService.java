package com.easysoul.easesoul_server.service;

//Imports

import com.easysoul.easesoul_server.dto.RegisterRequestDto;
import com.easysoul.easesoul_server.email.EmailService;
import com.easysoul.easesoul_server.exceptions.EmailAlreadyExistsException;
import com.easysoul.easesoul_server.model.ERole;
import com.easysoul.easesoul_server.model.Role;
import com.easysoul.easesoul_server.model.Token;
import com.easysoul.easesoul_server.model.User;
import com.easysoul.easesoul_server.repository.RoleRepository;
import com.easysoul.easesoul_server.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager entityManager;


    // Register new user
    public User register(RegisterRequestDto registerRequest) throws Exception {
        logger.info("Starting registration for email: {}", registerRequest.getEmail());

        // Check if email is already in use
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            logger.warn("Email already exists: {}", registerRequest.getEmail());
            throw new EmailAlreadyExistsException("Email already in use");
        }

        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());

        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(encodedPassword);
        user.setDateOfBirth(registerRequest.getDateOfBirth());
        user.setGender(registerRequest.getGender());
        user.setAddress(registerRequest.getAddress());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setActive(false);

        // Assign role and set additional fields for psychologists
        Role role;
        if ("PSYCHOLOGIST".equals(registerRequest.getRole())) {
            role = roleRepository.findByName(ERole.PSYCHOLOGIST)
                    .orElseThrow(() -> new RuntimeException("Error: Role PSYCHOLOGIST not found."));
            user.setLicenseNumber(registerRequest.getLicenseNumber());
            user.setSpecialization(registerRequest.getSpecialization());
        } else {
            role = roleRepository.findByName(ERole.PATIENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role PATIENT not found."));
        }

        user.setRole(role);
        return userRepository.save(user);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
    //Reset Password -> REQUEST
    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        Token token = tokenService.createPasswordResetToken(user);

        // Send email with the reset token (assuming emailService has been configured)
        String resetLink = "http://localhost:8080/auth/reset-password?token=" + token.getToken();
        emailService.sendPasswordResetEmail(user.getEmail(), resetLink);
    }

    public void resetPassword(String token, String newPassword) {
        tokenService.validateToken(token);

        Token resetToken = tokenService.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid reset token"));

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Delete the token after successful password reset
        tokenService.deleteToken(token);
    }

    // Logout the user by clearing the security context (session invalidation can be added as needed)
    public String logout() {
        try {
            // Log the logout attempt
            logger.info("User is attempting to log out.");

            // Clear the security context to invalidate the current session/user context
            SecurityContextHolder.clearContext();  // Clears authentication context

            // Log successful logout
            logger.info("User has successfully logged out.");

            // Return success message
            return "Logged out successfully.";
        } catch (Exception e) {
            // Log the error if anything goes wrong
            logger.error("Logout failed: {}", e.getMessage());
            return "An error occurred while logging out.";
        }
    }
}