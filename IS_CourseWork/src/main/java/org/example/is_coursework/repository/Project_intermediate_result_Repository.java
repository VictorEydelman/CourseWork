package org.example.is_coursework.repository;

import org.example.is_coursework.entities.Intermediate_result;
import org.example.is_coursework.entities.Project_Stages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Project_intermediate_result_Repository extends JpaRepository<Intermediate_result,Long> {
    List<Intermediate_result> getAllByProjectstages_Id(long projectstages);
}
