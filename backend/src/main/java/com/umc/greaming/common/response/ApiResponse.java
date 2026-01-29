package com.umc.greaming.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.umc.greaming.common.base.BaseStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonPropertyOrder({"isSuccess", "code", "message", "result"})
public class ApiResponse<T> {

    @JsonProperty("isSuccess")
    private boolean success;

    private String code;
    private String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T result;

    public static ResponseEntity<ApiResponse<Void>> success(BaseStatus status) {
        return ResponseEntity
                .status(status.getHttpStatus())
                .body(new ApiResponse<>(true, status.getCode(), status.getMessage(), null));
    }

    public static <T> ResponseEntity<ApiResponse<T>> success(BaseStatus status, T result) {
        return ResponseEntity
                .status(status.getHttpStatus())
                .body(new ApiResponse<>(true, status.getCode(), status.getMessage(), result));
    }

    public static ResponseEntity<ApiResponse<Void>> error(BaseStatus status) {
        return ResponseEntity
                .status(status.getHttpStatus())
                .body(new ApiResponse<>(false, status.getCode(), status.getMessage(), null));
    }

    public static ResponseEntity<ApiResponse<Void>> error(BaseStatus status, String message) {
        return ResponseEntity
                .status(status.getHttpStatus())
                .body(new ApiResponse<>(false, status.getCode(), message, null));
    }
}
