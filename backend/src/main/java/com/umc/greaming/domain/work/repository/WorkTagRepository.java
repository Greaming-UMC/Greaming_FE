package com.umc.greaming.domain.work.repository;

import com.umc.greaming.domain.work.entity.WorkTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkTagRepository extends JpaRepository<WorkTag, Long> {

    @Query("select wt.tag.name from WorkTag wt where wt.work.id = :workId")
    List<String> findTagNamesByWorkId(@Param("workId") Long workId);
}
