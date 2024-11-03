package com.easysoul.easesoul_server.service;

import com.easysoul.easesoul_server.dto.RegisterRequestDto;
import com.easysoul.easesoul_server.exceptions.EmailAlreadyExistsException;
import com.easysoul.easesoul_server.model.ERole;
import com.easysoul.easesoul_server.model.Role;
import com.easysoul.easesoul_server.model.User;
import com.easysoul.easesoul_server.repository.RoleRepository;
import com.easysoul.easesoul_server.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.Session;
import org.hibernate.engine.jdbc.connections.spi.ConnectionProvider;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DatabaseMetaData;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager entityManager;

    private void logDatabaseDetails() {
        try {
            Session session = entityManager.unwrap(Session.class);
            SessionFactoryImplementor sessionFactory = (SessionFactoryImplementor) session.getSessionFactory();
            Connection connection = sessionFactory.getServiceRegistry()
                    .getService(ConnectionProvider.class)
                    .getConnection();

            DatabaseMetaData metaData = connection.getMetaData();

            // Log database details
            logger.info("Database Product Name: {}", metaData.getDatabaseProductName());
            logger.info("Database Name: {}", connection.getCatalog());
            logger.info("Schema Name: {}", connection.getSchema());

            // Get User entity metadata
            String tableName = entityManager.getMetamodel()
                    .entity(User.class)
                    .getName();

            logger.info("User Table Name: {}", tableName);

            connection.close();
        } catch (Exception e) {
            logger.error("Error getting database details: ", e);
        }
    }

    // Register new user
    public User register(RegisterRequestDto registerRequest) throws Exception {
        // Log database details at the start of registration
        logDatabaseDetails();

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
        User savedUser = userRepository.save(user);

        // Log successful registration
        logger.info("Successfully registered user with email: {} in table: {}",
                savedUser.getEmail(),
                entityManager.getMetamodel().entity(User.class).getName());

        return savedUser;
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
}