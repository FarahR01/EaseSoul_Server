package com.easysoul.easesoul_server.payload.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private String operation;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;

    private T data;
    private ErrorDetails error;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ErrorDetails {
        private String code;
        private String detail;
    }

    // Public static factory methods
    public static <T> ApiResponse<T> success(String message, String operation, T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .operation(operation)
                .timestamp(LocalDateTime.now())
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> error(String message, String operation, String errorCode, String errorDetail) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .operation(operation)
                .timestamp(LocalDateTime.now())
                .error(ErrorDetails.builder()
                        .code(errorCode)
                        .detail(errorDetail)
                        .build())
                .build();
    }
}