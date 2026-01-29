package com.umc.greaming.domain.work.repository;

import com.umc.greaming.domain.work.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkRepository extends JpaRepository<Work, Long> {
}
