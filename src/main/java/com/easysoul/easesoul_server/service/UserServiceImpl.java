package com.easysoul.easesoul_server.service;

import com.easysoul.easesoul_server.dto.UserDTO;
import com.easysoul.easesoul_server.exceptions.UserException;
import com.easysoul.easesoul_server.model.ERole;
import com.easysoul.easesoul_server.model.Role;
import com.easysoul.easesoul_server.model.User;
import com.easysoul.easesoul_server.repository.RoleRepository;
import com.easysoul.easesoul_server.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Autowired
    private TokenService tokenService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserException("User not found with id: " + id));
        return mapToDTO(user);
    }

    @Override
    public UserDTO createUser(UserDTO userDTO, String currentUserRole) {
        validateAdminRole(currentUserRole, "Only Admins can create users.");
        User user = mapToEntity(userDTO);
        User savedUser = userRepository.save(user);
        return mapToDTO(savedUser);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO, String currentUserRole) {
        validateAdminRole(currentUserRole, "Only Admins can update users.");
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserException("User not found with id: " + id));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());

        // Get the Role entity based on the ERole enum
        Role role = roleRepository.findByName(ERole.valueOf(userDTO.getRole().toUpperCase()))
                .orElseThrow(() -> new UserException("Role not found"));
        user.setRole(role);

        User updatedUser = userRepository.save(user);
        return mapToDTO(updatedUser);
    }


//Delete a User By Admin
    @Override
    public void deleteUser(Long id, String currentUserRole) {
        logger.debug("Validating role for user role: {}", currentUserRole);

        try {
            validateAdminRole(currentUserRole, "Only Admins can delete users.");
            logger.debug("Role validation passed for user role: {}", currentUserRole);

            if (!userRepository.existsById(id)) {
                logger.warn("User with ID {} not found in the database", id);
                throw new UserException("User not found with id: " + id);
            }
            tokenService.deleteTokensByUserId(id);

            userRepository.deleteById(id);
            logger.info("User with ID {} deleted successfully", id);
        } catch (Exception e) {
            logger.error("Error occurred during user deletion with ID: {}", id, e);
            throw e;
        }
    }

    @Override
    public ERole getRoleByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserException("User not found with email: " + email));
        return user.getRole(); // Return the role directly
    }

    @Override
    public List<UserDTO> getUsersByRole(String role) {
        ERole eRole;
        try {
            eRole = ERole.valueOf(role.toUpperCase()); // Convert string to enum
        } catch (IllegalArgumentException e) {
            throw new UserException("Invalid role: " + role);
        }

        return userRepository.findByRoleName(eRole).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    public String getUserEmailById(Long id) {
        return userRepository.findById(id)
                .map(User::getEmail)
                .orElse(null);
    }

    private void validateAdminRole(String role, String errorMessage) {
        if (!ERole.ADMIN.name().equalsIgnoreCase(role)) {
            throw new UserException("Unauthorized: " + errorMessage);
        }
    }

    private UserDTO mapToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setAddress(user.getAddress());
        // Map the role name to string
        userDTO.setRole(user.getRole().name()); // Using name() method to get the string representation
        return userDTO;
    }

    private User mapToEntity(UserDTO userDTO) {
        User user = new User();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());

        // Convert role string to enum before setting
        ERole roleEnum = ERole.valueOf(userDTO.getRole().toUpperCase()); // Convert string to enum

        // Find the Role entity by ERole enum
        Optional<Role> role = roleRepository.findByName(roleEnum);

        if (role.isPresent()) {
            user.setRole(role.get());  // Set the Role object (not the ERole enum)
        } else {
            // Handle case where Role is not found
            throw new RuntimeException("Role not found");
        }

        return user;
    }
    @Override
    public ERole getRoleByUserIdOrEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        return user.getRole().getName();  // Assuming User has a getRole() method returning the Role object
    }
}
