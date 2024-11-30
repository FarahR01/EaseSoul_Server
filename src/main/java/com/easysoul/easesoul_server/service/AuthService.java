package com.easysoul.easesoul_server.service;

//Imports

import com.easysoul.easesoul_server.dto.RegisterRequestDto;
import com.easysoul.easesoul_server.email.EmailService;
import com.easysoul.easesoul_server.exceptions.EmailAlreadyExistsException;
import com.easysoul.easesoul_server.exceptions.InvalidTokenException;
import com.easysoul.easesoul_server.model.ERole;
import com.easysoul.easesoul_server.model.Role;
import com.easysoul.easesoul_server.model.Token;
import com.easysoul.easesoul_server.model.User;
import com.easysoul.easesoul_server.repository.RoleRepository;
import com.easysoul.easesoul_server.repository.TokenRepository;
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
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    private TokenRepository tokenRepository;

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

        // Use the frontend URL for the reset link
        String frontendUrl = System.getenv("FRONTEND_URL"); // Ensure this is set in your environment variables
        if (frontendUrl == null) {
            frontendUrl = "http://localhost:4200"; // Default to localhost if not set
        }
        String resetLink = frontendUrl + "/auth/forgot-pass?token=" + token.getToken();

        // Include the username when calling the email service
        emailService.sendPasswordResetEmail(user.getEmail(), user.getUsername(), resetLink);
    }
    private boolean isValidPassword(String password) {
        // Example criteria: at least 8 characters, one uppercase, one number, one special character
        String passwordPattern = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$";
        return password.matches(passwordPattern);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        // Find and validate the token
        Token resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new InvalidTokenException("Invalid or expired reset token"));

        // Check if token is expired
        if (resetToken.isExpired()) {
            throw new InvalidTokenException("Token has expired");
        }


        // Get the user associated with the token
        User user = resetToken.getUser();

        // Encode the new password
        String encodedPassword = passwordEncoder.encode(newPassword);

        // Update the password
        user.setPassword(encodedPassword);
        userRepository.save(user);

        // Invalidate the token after use
        tokenRepository.delete(resetToken);
    }
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
    //Resend Activation Email Logic
    public void resendActivationEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (user.isActive()) {
            throw new IllegalStateException("User already activated");
        }

        Token token = tokenService.createToken(user);

        // Send email with the reset token (assuming emailService has been configured)
        String activationLink = "http://localhost:4200/auth/activate?token=" + token.getToken();
        emailService.sendActivationEmail(user.getEmail(), activationLink);
    }

}