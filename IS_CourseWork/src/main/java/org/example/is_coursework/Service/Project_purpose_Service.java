package org.example.is_coursework.Service;

import org.example.is_coursework.entities.Project;
import org.example.is_coursework.entities.Project_objectives;
import org.example.is_coursework.entities.Project_purpose;
import org.example.is_coursework.repository.Project_purpose_Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Project_purpose_Service {
    private final Project_purpose_Repository project_purpose_repository;

    public Project_purpose_Service(Project_purpose_Repository projectPurposeRepository) {
        project_purpose_repository = projectPurposeRepository;
    }
    public List<Project_purpose> getByProject(Project project) {
        return project_purpose_repository.getAllByProject(project);
    }
    public void save(Project_purpose projectPurpose){
        project_purpose_repository.save(projectPurpose);
    }

    public void delete(Project project){
        project_purpose_repository.deleteAllByProject(project);
    }
}
