package org.example.is_coursework.repository;

import org.example.is_coursework.entities.Project;
import org.example.is_coursework.entities.Project_objectives;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Project_objectives_Repository extends JpaRepository<Project_objectives,Long> {
    void deleteAllByProject(Project project);
    List<Project_objectives> getAllByProject(Project project);
}
