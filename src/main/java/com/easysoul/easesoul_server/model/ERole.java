package com.easysoul.easesoul_server.model;

public enum ERole {
    ADMIN,
    PATIENT,
    PSYCHOLOGIST;

    public ERole getName() {
        return ERole.values()[ordinal()];
    }
}
