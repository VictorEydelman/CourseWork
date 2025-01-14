package org.example.is_coursework.repository;

import org.example.is_coursework.entities.Project_Stages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Project_Stages_Repository extends JpaRepository<Project_Stages,Long> {
    List<Project_Stages> getByProject_Id(Long id);
}
