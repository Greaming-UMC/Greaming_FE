package com.umc.greaming.domain.work.dto.response;

import com.umc.greaming.domain.work.entity.Work;

import java.util.List;

public record WorkPreviewResponse(
        Long workId,
        String thumbnailUrl,
        List<String> tags
) {
    public static WorkPreviewResponse from(Work work, List<String> tags) {
        return new WorkPreviewResponse(
                work.getId(),
                work.getCover(), // cover를 thumbnailUrl로 내려줌
                tags
        );
    }
}
