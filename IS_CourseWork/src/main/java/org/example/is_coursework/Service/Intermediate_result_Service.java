package org.example.is_coursework.Service;

import org.example.is_coursework.entities.Intermediate_result;
import org.example.is_coursework.entities.Project_Stages;
import org.example.is_coursework.repository.Project_intermediate_result_Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Intermediate_result_Service {
    private final Project_intermediate_result_Repository projectIntermediateResultRepository;

    public Intermediate_result_Service(Project_intermediate_result_Repository projectIntermediateResultRepository) {
        this.projectIntermediateResultRepository = projectIntermediateResultRepository;
    }

    public void save(Intermediate_result intermediate_result) {
        projectIntermediateResultRepository.save(intermediate_result);
    }

    public List<Intermediate_result> getByProject_stages(long projectstages){
        return projectIntermediateResultRepository.getAllByProjectstages_Id(projectstages);
    }
    public Intermediate_result getById(long id){
        return projectIntermediateResultRepository.getById(id);
    }
}
