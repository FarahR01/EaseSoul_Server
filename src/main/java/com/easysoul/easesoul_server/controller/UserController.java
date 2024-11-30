package com.easysoul.easesoul_server.controller;

import com.easysoul.easesoul_server.dto.UserDTO;
import com.easysoul.easesoul_server.model.ERole;
import com.easysoul.easesoul_server.payload.response.ApiResponse;
import com.easysoul.easesoul_server.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    // Create a new user
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO, Principal principal) {
        String currentUserRole = String.valueOf(userService.getRoleByEmail(principal.getName()));
        // Check if current user is authorized to create users (e.g., admin)
        if ("ADMIN".equals(currentUserRole)) {
            UserDTO createdUser = userService.createUser(userDTO, currentUserRole);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    // Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO, Principal principal) {
        String currentUserRole = String.valueOf(userService.getRoleByEmail(principal.getName()));
        // Ensure that only admin can update user details
        if ("ADMIN".equals(currentUserRole)) {
            UserDTO updatedUser = userService.updateUser(id, userDTO, currentUserRole);
            return ResponseEntity.ok(updatedUser);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    // Delete a user
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable Long id) {
        logger.debug("Received request to delete user with ID: {}", id);

        try {
            // Get the authenticated user's email
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            // Check if user exists before deletion
            if (!userService.existsById(id)) {
                logger.warn("User with ID {} not found. Request made by admin {}", id, email);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error(
                                "User deletion failed",
                                "DELETE_USER",
                                "USER_NOT_FOUND",
                                String.format("User with ID %d does not exist", id)
                        ));
            }

            // Get user details before deletion (optional)
            String targetUserEmail = userService.getUserEmailById(id);

            // Perform deletion
            userService.deleteUser(id, "ADMIN");

            logger.info("User with ID {} deleted successfully by admin {}", id, email);

            return ResponseEntity.ok(ApiResponse.success(
                    "User deleted successfully",
                    "DELETE_USER",
                    Map.of(
                            "deletedUserId", id,
                            "deletedUserEmail", targetUserEmail,
                            "deletedBy", email,
                            "deletedAt", LocalDateTime.now()
                    )
            ));

        } catch (AccessDeniedException e) {
            logger.error("Access denied for user trying to delete user with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error(
                            "User deletion failed",
                            "DELETE_USER",
                            "ACCESS_DENIED",
                            "You do not have permission to delete this user"
                    ));

        } catch (Exception e) {
            logger.error("Error occurred while processing delete request for user with ID: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(
                            "User deletion failed",
                            "DELETE_USER",
                            "INTERNAL_SERVER_ERROR",
                            "An unexpected error occurred while processing your request"
                    ));
        }
    }
    @GetMapping("/role")
    public ERole getUserRole(@RequestParam("email") String email) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty.");
        }
        return userService.getRoleByUserIdOrEmail(email);
    }


    // Get all psychologists (users with the "PSYCHOLOGIST" role)
    @GetMapping("/psychologists")
    public ResponseEntity<List<UserDTO>> getPsychologists() {
        List<UserDTO> psychologists = userService.getUsersByRole("PSYCHOLOGIST");
        return ResponseEntity.ok(psychologists);
    }
}
