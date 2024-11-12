package com.easysoul.easesoul_server.controller;

import com.easysoul.easesoul_server.dto.ProfileSettingsDto;
import com.easysoul.easesoul_server.model.ProfilSettings;
import com.easysoul.easesoul_server.service.ProfilSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;





@RestController
@RequestMapping("/profile")
public class ProfileSettingsController {

    @Autowired
    private ProfilSettingsService profilSettingsService;

    // Endpoint pour créer ou mettre à jour le profil d'un utilisateur
    @PostMapping("/settings")
    public ResponseEntity<?> createOrUpdateProfileSettings(@RequestBody ProfileSettingsDto profileSettingsDto) {
        try {
            ProfilSettings profilSettings = profilSettingsService.createOrUpdateProfileSettings(profileSettingsDto);
            return ResponseEntity.ok(profilSettings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint pour récupérer les informations du profil d'un utilisateur par son ID
    @GetMapping("/settings/{userId}")
    public ResponseEntity<?> getProfileSettings(@PathVariable Long userId) {
        try {
            Optional<ProfilSettings> profileSettings = profilSettingsService.getProfilSettingsByUserId(userId);
            if (profileSettings.isPresent()) {
                return ResponseEntity.ok(profileSettings.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
