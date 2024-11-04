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

    // Create a token (either for login or password reset)
    public Token createToken(User user) {
        String tokenValue = UUID.randomUUID().toString();
        Instant expiryDate = Instant.now().plusSeconds(3600); // 1 hour expiry
        Token token = new Token(tokenValue, user, expiryDate);
        return tokenRepository.save(token);
    }

    // Find token by value
    public Optional<Token> findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    // Validate the token for expiration (applicable for both activation and reset tokens)
    public void validateToken(String token) throws ActivationTokenException {
        Token foundToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new ActivationTokenException("Invalid token"));

        if (foundToken.getExpiryDate().isBefore(Instant.now())) {
            throw new ActivationTokenException("Token has expired");
        }
    }

    // Delete a token after use
    @Transactional
    public void deleteToken(String token) {
        tokenRepository.deleteByToken(token);
    }

    // Create a password reset token
    public Token createPasswordResetToken(User user) {
        String tokenValue = UUID.randomUUID().toString();
        Instant expiryDate = Instant.now().plusSeconds(3600); // Token valid for 1 hour
        Token token = new Token(tokenValue, user, expiryDate);
        return tokenRepository.save(token);
    }
}
