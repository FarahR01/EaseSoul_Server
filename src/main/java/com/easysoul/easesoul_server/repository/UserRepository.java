package com.easysoul.easesoul_server.repository;

import com.easysoul.easesoul_server.model.ERole;
import com.easysoul.easesoul_server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findByRoleName(ERole roleName);

}
