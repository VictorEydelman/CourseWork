package org.example.is_coursework.repository;

import org.example.is_coursework.entities.Project_for_approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Project_for_approval_Repository extends JpaRepository<Project_for_approval, Long> {
    @Query("SELECT p FROM Project_for_approval p WHERE p.project.scientific_supervisor_user_id.id = :supervisorId")
    List<Project_for_approval> findAllBySupervisorId(@Param("supervisorId") Long supervisorId);
}
