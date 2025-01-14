package org.example.is_coursework.Service;

import org.example.is_coursework.entities.Objectives_stage;
import org.example.is_coursework.entities.Project_Stages;
import org.example.is_coursework.repository.Objectives_stage_Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Objectives_stage_Service {
    private final Objectives_stage_Repository objectives_stage_repository;

    public Objectives_stage_Service(Objectives_stage_Repository objectivesStageRepository) {
        objectives_stage_repository = objectivesStageRepository;
    }

    public void save(Objectives_stage objectives_stage) {
        objectives_stage_repository.save(objectives_stage);
    }

    public List<Objectives_stage> getByProjectStages(long project_stage) {
        return objectives_stage_repository.getAllByProjectstages_Id(project_stage);
    }
}
