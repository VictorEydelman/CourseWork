package org.example.is_coursework.repository;

import org.example.is_coursework.entities.Project;
import org.example.is_coursework.entities.Project_objectives;
import org.example.is_coursework.entities.Project_purpose;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Project_purpose_Repository extends JpaRepository<Project_purpose,Long> {
    void deleteAllByProject(Project project);
    List<Project_purpose> getAllByProject(Project project);
}
