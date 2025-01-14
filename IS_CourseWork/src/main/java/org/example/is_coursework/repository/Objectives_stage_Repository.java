package org.example.is_coursework.repository;

import org.example.is_coursework.entities.Objectives_stage;
import org.example.is_coursework.entities.Project_Stages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Objectives_stage_Repository extends JpaRepository<Objectives_stage, Long> {
    List<Objectives_stage> getAllByProjectstages_Id(long project_stages);
}
