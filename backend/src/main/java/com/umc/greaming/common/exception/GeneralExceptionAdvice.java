package com.umc.greaming.common.exception;

import com.umc.greaming.common.response.ApiResponse;
import com.umc.greaming.common.status.error.ErrorStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class GeneralExceptionAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(GeneralException.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneralException(GeneralException e) {
        if (e.getErrorStatus().getHttpStatus().is5xxServerError()) {
            log.error("[*] GeneralException :", e);
        } else {
            log.warn("[*] GeneralException : {}", e.getMessage());
        }
        return ApiResponse.error(e.getErrorStatus());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Void>> handleIllegalArgumentException(IllegalArgumentException e) {
        log.error("[*] IllegalArgumentException :", e);
        return ApiResponse.error(ErrorStatus.BAD_REQUEST, "잘못된 요청입니다: " + e.getMessage());
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ApiResponse<Void>> handleNullPointerException(NullPointerException e) {
        log.error("[*] NullPointerException :", e);
        return ApiResponse.error(ErrorStatus.INTERNAL_SERVER_ERROR,
                "서버에서 예기치 않은 오류가 발생했습니다. (Null 참조)");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleException(Exception e) {
        log.error("[*] Internal Server Error :", e);
        return ApiResponse.error(ErrorStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request
    ) {
        String msg = ex.getBindingResult().getFieldErrors().isEmpty()
                ? ErrorStatus.VALIDATION_ERROR.getMessage()
                : ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();

        return handleExceptionInternal(
                ex,
                ApiResponse.error(ErrorStatus.VALIDATION_ERROR, msg).getBody(),
                headers,
                status,
                request
        );
    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
            org.springframework.web.HttpRequestMethodNotSupportedException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request
    ) {
        return handleExceptionInternal(
                ex,
                ApiResponse.error(ErrorStatus.METHOD_NOT_ALLOWED).getBody(),
                headers,
                status,
                request
        );
    }
}
