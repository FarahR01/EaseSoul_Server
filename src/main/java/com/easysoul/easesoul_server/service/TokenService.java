package com.easysoul.easesoul_server.service;

import com.easysoul.easesoul_server.exceptions.ActivationTokenException;
import com.easysoul.easesoul_server.model.Token;
import com.easysoul.easesoul_server.model.User;
import com.easysoul.easesoul_server.repository.TokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    public Token createToken(User user) {
        String tokenValue = UUID.randomUUID().toString();
        Instant expiryDate = Instant.now().plusSeconds(3600); // 1 hour expiry

        Token token = new Token(tokenValue, user, expiryDate);
        return tokenRepository.save(token);
    }

    public Optional<Token> findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public void validateToken(String token) throws ActivationTokenException {
        Token activationToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new ActivationTokenException("Invalid activation token"));

        if (activationToken.getExpiryDate().isBefore(Instant.now())) {
            throw new ActivationTokenException("Token has expired");
        }
    }
    @Transactional
    public void deleteToken(String token) {
        tokenRepository.deleteByToken(token);
    }
}
