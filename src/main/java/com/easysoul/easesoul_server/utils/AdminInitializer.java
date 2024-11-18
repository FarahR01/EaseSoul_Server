package com.easysoul.easesoul_server.utils;

import com.easysoul.easesoul_server.model.ERole;
import com.easysoul.easesoul_server.model.Role;
import com.easysoul.easesoul_server.model.User;
import com.easysoul.easesoul_server.repository.RoleRepository;
import com.easysoul.easesoul_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String ADMIN_EMAIL = "es.admin@gmail.com";

    @Override
    public void run(String... args) throws Exception {
        // First, delete existing admin if exists
        userRepository.findByEmail("admin@easysoul.com").ifPresent(user -> {
            userRepository.delete(user);
            System.out.println("Deleted old admin user");
        });

        // Create new admin user with proper credentials
        if (userRepository.findByEmail(ADMIN_EMAIL).isEmpty()) {
            // Create the admin role if it does not exist
            Role adminRole = roleRepository.findByName(ERole.ADMIN)
                    .orElseGet(() -> {
                        Role newRole = new Role();
                        newRole.setName(ERole.ADMIN);
                        return roleRepository.save(newRole);
                    });

            // Create the admin user with proper password encoding
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail(ADMIN_EMAIL);
            admin.setPassword(passwordEncoder.encode("adminES")); // Replace with actual secure password
            admin.setPhoneNumber("1234567890");
            admin.setAddress("Admin Address");
            admin.setRole(adminRole);
            admin.setActive(true);
            admin.setCreatedAt(LocalDateTime.now());

            // Save the admin user
            userRepository.save(admin);
            System.out.println("New admin user created successfully with email: " + admin.getEmail());
        } else {
            System.out.println("Admin user already exists with email: " + ADMIN_EMAIL);
        }
    }
}