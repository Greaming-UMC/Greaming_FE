package com.umc.greaming.domain.work.controller;

import com.umc.greaming.common.response.ApiResponse;
import com.umc.greaming.common.status.success.SuccessStatus;
import com.umc.greaming.domain.work.dto.response.WorkPreviewResponse;
import com.umc.greaming.domain.work.service.WorkQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.constraints.Positive;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/works")
public class WorkController {

    private final WorkQueryService workQueryService;

    @GetMapping("/{workId}/preview")
    public ResponseEntity<ApiResponse<WorkPreviewResponse>> getWorkPreview(@PathVariable @Positive Long workId) {
        WorkPreviewResponse result = workQueryService.getWorkPreview(workId);
        return ApiResponse.success(SuccessStatus.WORK_PREVIEW_SUCCESS, result);
    }
}
