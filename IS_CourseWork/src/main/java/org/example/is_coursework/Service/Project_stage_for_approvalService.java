package org.example.is_coursework.Service;

import org.example.is_coursework.entities.Project_for_approval;
import org.example.is_coursework.entities.Project_stages_for_approval;
import org.example.is_coursework.repository.Project_stages_for_approvalRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Project_stage_for_approvalService {
    private final Project_stages_for_approvalRepository project_stages_for_approval_repository;
    public Project_stage_for_approvalService(Project_stages_for_approvalRepository project_stages_for_approval_repository) {
        this.project_stages_for_approval_repository = project_stages_for_approval_repository;
    }
    public void save(Project_stages_for_approval project_stages_for_approval) {
        project_stages_for_approval_repository.save(project_stages_for_approval);
    }
    public List<Project_stages_for_approval> getAllbyUser(Long user){
        return project_stages_for_approval_repository.findAllBySupervisorId(user);
    }
}
