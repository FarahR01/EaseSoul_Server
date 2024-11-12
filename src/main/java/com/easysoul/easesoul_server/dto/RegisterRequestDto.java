package com.easysoul.easesoul_server.dto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class RegisterRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String phoneNumber;
    private String role;
    // New fields for psychologists
    private String licenseNumber;
    private String specialization;
}
