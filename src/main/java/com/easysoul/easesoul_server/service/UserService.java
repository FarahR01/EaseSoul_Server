package com.easysoul.easesoul_server.service;

import com.easysoul.easesoul_server.dto.UserDTO;
import com.easysoul.easesoul_server.exceptions.UserException;
import com.easysoul.easesoul_server.model.ERole;

import java.util.List;

public interface UserService {

    List<UserDTO> getAllUsers();

    UserDTO getUserById(Long id) throws UserException;

    UserDTO createUser(UserDTO userDTO, String currentUserRole) throws UserException;

    UserDTO updateUser(Long id, UserDTO userDTO, String currentUserRole) throws UserException;

    void deleteUser(Long id, String currentUserRole) throws UserException;

    ERole getRoleByEmail(String email);
    List<UserDTO> getUsersByRole(String role);
    boolean existsById(Long id);
    String getUserEmailById(Long id);
}
