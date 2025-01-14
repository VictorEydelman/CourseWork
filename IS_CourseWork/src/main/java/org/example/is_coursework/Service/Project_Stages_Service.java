package org.example.is_coursework.Service;

import org.example.is_coursework.entities.Project_Stages;
import org.example.is_coursework.repository.Project_Stages_Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Project_Stages_Service {
    private final Project_Stages_Repository projectStagesRepository;

    public Project_Stages_Service(Project_Stages_Repository projectStagesRepository) {
        this.projectStagesRepository = projectStagesRepository;
    }

    public void save(Project_Stages project_stages){
        projectStagesRepository.save(project_stages);
    }

    public List<Project_Stages> getbyproject(Long project_id){
        return projectStagesRepository.getByProject_Id(project_id);
    }
    public Project_Stages getById(Long id){
        return projectStagesRepository.getById(id);
    }
}
