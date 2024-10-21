package com.easysoul.easesoul_server.service;

import com.easysoul.easesoul_server.dto.RegisterRequestDto;
import com.easysoul.easesoul_server.exceptions.EmailAlreadyExistsException;
import com.easysoul.easesoul_server.model.ERole;
import com.easysoul.easesoul_server.model.Role;
import com.easysoul.easesoul_server.model.User;
import com.easysoul.easesoul_server.repository.RoleRepository;
import com.easysoul.easesoul_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(RegisterRequestDto registerRequest) throws Exception {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new EmailAlreadyExistsException("Email already in use");
        }

        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setDateOfBirth(registerRequest.getDateOfBirth());
        user.setGender(registerRequest.getGender());
        user.setAddress(registerRequest.getAddress());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setActive(false);

        // Assign role based on the request
        Role role;
        if ("PSYCHOLOGIST".equals(registerRequest.getRole())) {
            role = roleRepository.findByName(ERole.PSYCHOLOGIST)
                    .orElseThrow(() -> new RuntimeException("Error: Role PSYCHOLOGIST not found."));
        } else {
            role = roleRepository.findByName(ERole.PATIENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role PATIENT not found."));
        }

        user.setRole(role);
        userRepository.save(user);

        return user;
    }
}
