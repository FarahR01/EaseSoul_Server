// First, let's create a custom API response class
package com.easysoul.easesoul_server.payload.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
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
    public static class ErrorDetails {
        private String code;
        private String detail;
    }

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



