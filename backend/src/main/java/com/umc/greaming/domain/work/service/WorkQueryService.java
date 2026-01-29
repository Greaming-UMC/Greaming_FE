package com.umc.greaming.domain.work.service;

import com.umc.greaming.common.exception.GeneralException;
import com.umc.greaming.common.status.error.ErrorStatus;
import com.umc.greaming.domain.work.dto.response.WorkPreviewResponse;
import com.umc.greaming.domain.work.entity.Work;
import com.umc.greaming.domain.work.repository.WorkRepository;
import com.umc.greaming.domain.work.repository.WorkTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WorkQueryService {

    private final WorkRepository workRepository;
    private final WorkTagRepository workTagRepository;

    public WorkPreviewResponse getWorkPreview(Long workId) {
        Work work = workRepository.findById(workId)
                .orElseThrow(() -> new GeneralException(ErrorStatus.WORK_NOT_FOUND));

        List<String> tags = workTagRepository.findTagNamesByWorkId(workId);

        return WorkPreviewResponse.from(work, tags);
    }
}
