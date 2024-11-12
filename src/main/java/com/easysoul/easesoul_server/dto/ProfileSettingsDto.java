package com.easysoul.easesoul_server.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ProfileSettingsDto {
    // Champs communs
    private Long userId;          // ID de l'utilisateur associé au profil
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String phoneNumber;

    // Champs spécifiques pour Psychologue
    private String diploma;
    private String specialization;
    private String experience;
    private List<String> tags;
    private List<String> categories;
    private String bio;
    private Double pricing;
    private List<String> services;
}
