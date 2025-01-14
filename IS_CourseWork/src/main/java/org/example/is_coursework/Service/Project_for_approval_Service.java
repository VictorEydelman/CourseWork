package org.example.is_coursework.Service;

import org.example.is_coursework.entities.Project;
import org.example.is_coursework.entities.Project_for_approval;
import org.example.is_coursework.repository.ProjectRepository;
import org.example.is_coursework.repository.Project_for_approval_Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Project_for_approval_Service {
    private final Project_for_approval_Repository project_for_approval_repository;

    public Project_for_approval_Service(Project_for_approval_Repository projectForApprovalRepository) {
        project_for_approval_repository = projectForApprovalRepository;
    }

    public void save(Project_for_approval project) {
        project_for_approval_repository.save(project);
    }
    public List<Project_for_approval> getAllbyUser(Long user){
        return project_for_approval_repository.findAllBySupervisorId(user);
    }
}
