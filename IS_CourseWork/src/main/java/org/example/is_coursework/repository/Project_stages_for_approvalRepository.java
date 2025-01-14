package org.example.is_coursework.repository;

import org.example.is_coursework.entities.Project_stages_for_approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Project_stages_for_approvalRepository extends JpaRepository<Project_stages_for_approval, Long> {
    @Query("SELECT p FROM Project_stages_for_approval p WHERE p.project_stages.project.scientific_supervisor_user_id.id = :supervisorId")
    List<Project_stages_for_approval> findAllBySupervisorId(@Param("supervisorId") Long supervisorId);
}
