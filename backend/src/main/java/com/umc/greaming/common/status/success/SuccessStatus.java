package com.umc.greaming.common.status.success;

import com.umc.greaming.common.base.BaseStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessStatus implements BaseStatus {

    //common success
    SUCCESS_200("COMM_200", HttpStatus.OK, "성공입니다."),
    SUCCESS_201("COMM_201", HttpStatus.CREATED, "성공입니다."),
    SUCCESS_204("COMM_204", HttpStatus.NO_CONTENT, "성공입니다."),

    //auth
    AUTH_URL_SUCCESS("AUTH_200", HttpStatus.OK, "로그인 URL 조회 성공"),
    LOGIN_SUCCESS("AUTH_200", HttpStatus.OK, "로그인 성공"),
    LOGOUT_SUCCESS("AUTH_200", HttpStatus.OK, "로그아웃 성공"),
    CREATE_USER_SUCCESS("AUTH_201", HttpStatus.CREATED, "회원가입 성공"),
    DELETE_USER_SUCCESS("AUTH_200", HttpStatus.OK, "회원탈퇴 성공"),
    CHECK_ID_SUCCESS("AUTH_200", HttpStatus.OK, "아이디 중복 확인 성공"),
    CHECK_NICKNAME_SUCCESS("AUTH_200", HttpStatus.OK, "닉네임 중복 확인 성공"),
    UPDATE_PASSWORD_SUCCESS("AUTH_200", HttpStatus.OK, "비밀번호 변경 성공"),
    FIND_EMAIL_SUCCESS("AUTH_200", HttpStatus.OK, "이메일 찾기 성공"),
    CHECK_EMAIL_SUCCESS("AUTH_200", HttpStatus.OK, "이메일 중복 확인 성공"),
    SEND_EMAIL_VERIFICATION_SUCCESS("AUTH_200", HttpStatus.OK, "이메일 인증 코드 발송 성공"),
    CONFIRM_EMAIL_VERIFICATION_SUCCESS("AUTH_200", HttpStatus.OK, "이메일 인증 성공"),
    CREATE_TOKEN_SUCCESS("AUTH_200", HttpStatus.OK, "토큰 재발급 성공"),
    CONFIRM_PASSWORD_SUCCESS("AUTH_200", HttpStatus.OK, "비밀번호 검증 성공"),

    //작품 미리보기
    WORK_PREVIEW_SUCCESS("WORK_200", HttpStatus.OK, "작품 미리보기 조회 성공");

    private final String code;
    private final HttpStatus httpStatus;
    private final String message;

    @Override
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
