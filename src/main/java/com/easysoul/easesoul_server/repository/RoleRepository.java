package com.easysoul.easesoul_server.repository;

import com.easysoul.easesoul_server.model.ERole;
import com.easysoul.easesoul_server.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
