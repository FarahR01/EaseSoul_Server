package com.easysoul.easesoul_server.utils;


import com.easysoul.easesoul_server.model.ERole;
import com.easysoul.easesoul_server.model.Role;
import com.easysoul.easesoul_server.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class RoleInitializer {

    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    public void initRoles() {
        // Check and insert roles if not present
        if (roleRepository.findByName(ERole.ADMIN).isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName(ERole.ADMIN);
            roleRepository.save(adminRole);
        }

        if (roleRepository.findByName(ERole.PATIENT).isEmpty()) {
            Role patientRole = new Role();
            patientRole.setName(ERole.PATIENT);
            roleRepository.save(patientRole);
        }

        if (roleRepository.findByName(ERole.PSYCHOLOGIST).isEmpty()) {
            Role psychologistRole = new Role();
            psychologistRole.setName(ERole.PSYCHOLOGIST);
            roleRepository.save(psychologistRole);
        }
    }
}
