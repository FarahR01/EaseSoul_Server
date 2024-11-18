package com.easysoul.easesoul_server.security;

import com.easysoul.easesoul_server.exceptions.UserException;
import com.easysoul.easesoul_server.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class RoleVerification {

    private final UserService userService;

    public RoleVerification(UserService userService) {
        this.userService = userService;
    }

    public void verifyAdminRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        String role = String.valueOf(userService.getRoleByEmail(email));

        if (!"Admin".equals(role)) {
            throw new UserException("Unauthorized: Only Admins can perform this action.");
        }
    }
}
