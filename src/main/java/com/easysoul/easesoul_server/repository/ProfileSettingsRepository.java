package com.easysoul.easesoul_server.repository;

import com.easysoul.easesoul_server.model.ProfilSettings; // Assurez-vous d'importer le bon modèle
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProfileSettingsRepository extends JpaRepository<ProfilSettings, Long> {
    Optional<ProfilSettings> findByUserId(Long userId);
}
