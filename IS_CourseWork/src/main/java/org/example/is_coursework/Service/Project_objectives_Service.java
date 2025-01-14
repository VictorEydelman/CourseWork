package org.example.is_coursework.Service;

import org.example.is_coursework.entities.Project;
import org.example.is_coursework.entities.Project_objectives;
import org.example.is_coursework.repository.Project_objectives_Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Project_objectives_Service {
    private final Project_objectives_Repository project_objectives_repository;

    public Project_objectives_Service(Project_objectives_Repository projectObjectivesRepository) {
        project_objectives_repository = projectObjectivesRepository;
    }
    public List<Project_objectives> getByProject(Project project) {
        return project_objectives_repository.getAllByProject(project);
    }
    public void save(Project_objectives project_objectives){
        project_objectives_repository.save(project_objectives);
    }

    public void delete(Project project){
        project_objectives_repository.deleteAllByProject(project);
    }
}
