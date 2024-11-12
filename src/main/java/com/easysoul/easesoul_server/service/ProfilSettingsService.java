package com.easysoul.easesoul_server.service;

import com.easysoul.easesoul_server.dto.ProfileSettingsDto; // Import the DTO class
import com.easysoul.easesoul_server.model.ProfilSettings;
import com.easysoul.easesoul_server.repository.ProfileSettingsRepository;
import com.easysoul.easesoul_server.model.User;
import com.easysoul.easesoul_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfilSettingsService {

    @Autowired
    private ProfileSettingsRepository profilSettingsRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<ProfilSettings> getProfilSettingsByUserId(Long userId) {
        return profilSettingsRepository.findByUserId(userId); // Ensure using the correct repository
    }

    public ProfilSettings updateProfilSettings(Long userId, ProfilSettings updatedProfil) {
        ProfilSettings existingProfil = profilSettingsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile settings not found for user"));

        // Update profile information
        existingProfil.setDateOfBirth(updatedProfil.getDateOfBirth());
        existingProfil.setGender(updatedProfil.getGender());
        existingProfil.setAddress(updatedProfil.getAddress());
        existingProfil.setPhoneNumber(updatedProfil.getPhoneNumber());
        existingProfil.setDiploma(updatedProfil.getDiploma());
        existingProfil.setSpecialization(updatedProfil.getSpecialization());
        existingProfil.setExperience(updatedProfil.getExperience());
        existingProfil.setTags(updatedProfil.getTags());
        existingProfil.setCategories(updatedProfil.getCategories());
        existingProfil.setBio(updatedProfil.getBio());
        existingProfil.setPricing(updatedProfil.getPricing());
        existingProfil.setServices(updatedProfil.getServices());

        return profilSettingsRepository.save(existingProfil);
    }

    public ProfilSettings createProfilSettingsForUser(Long userId, ProfilSettings profilSettings) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        profilSettings.setUser(user);
        return profilSettingsRepository.save(profilSettings);
    }

    // New method to create or update profile settings
    public ProfilSettings createOrUpdateProfileSettings(ProfileSettingsDto profileSettingsDto) {
        // Find the existing profile settings by user ID
        User user = userRepository.findById(profileSettingsDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Try to find existing profile settings
        Optional<ProfilSettings> existingProfilOpt = profilSettingsRepository.findByUserId(user.getId());
        ProfilSettings profilSettings;

        if (existingProfilOpt.isPresent()) {
            // If it exists, update it
            profilSettings = existingProfilOpt.get();
            profilSettings.setDateOfBirth(profileSettingsDto.getDateOfBirth());
            profilSettings.setGender(profileSettingsDto.getGender());
            profilSettings.setAddress(profileSettingsDto.getAddress());
            profilSettings.setPhoneNumber(profileSettingsDto.getPhoneNumber());
            profilSettings.setDiploma(profileSettingsDto.getDiploma());
            profilSettings.setSpecialization(profileSettingsDto.getSpecialization());
            profilSettings.setExperience(profileSettingsDto.getExperience());
            profilSettings.setTags(profileSettingsDto.getTags());
            profilSettings.setCategories(profileSettingsDto.getCategories());
            profilSettings.setBio(profileSettingsDto.getBio());
            profilSettings.setPricing(profileSettingsDto.getPricing());
            profilSettings.setServices(profileSettingsDto.getServices());
        } else {
            // If it doesn't exist, create a new one
            profilSettings = new ProfilSettings();
            profilSettings.setUser(user);
            profilSettings.setDateOfBirth(profileSettingsDto.getDateOfBirth());
            profilSettings.setGender(profileSettingsDto.getGender());
            profilSettings.setAddress(profileSettingsDto.getAddress());
            profilSettings.setPhoneNumber(profileSettingsDto.getPhoneNumber());
            profilSettings.setDiploma(profileSettingsDto.getDiploma());
            profilSettings.setSpecialization(profileSettingsDto.getSpecialization());
            profilSettings.setExperience(profileSettingsDto.getExperience());
            profilSettings.setTags(profileSettingsDto.getTags());
            profilSettings.setCategories(profileSettingsDto.getCategories());
            profilSettings.setBio(profileSettingsDto.getBio());
            profilSettings.setPricing(profileSettingsDto.getPricing());
            profilSettings.setServices(profileSettingsDto.getServices());
        }

        return profilSettingsRepository.save(profilSettings);
    }
}
