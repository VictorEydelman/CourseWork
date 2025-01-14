package org.example.is_coursework.Service;

import org.example.is_coursework.entities.Project;
import org.example.is_coursework.entities.User;
import org.example.is_coursework.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public void save(Project project) {
        projectRepository.save(project);
    }
    public Project getProject(long id) {
        return projectRepository.findById(id);
    }
    public void updateProject(Project project) {
        projectRepository.save(project);
    }
    public List<Project> getByUser(User user) {
        return projectRepository.findAllByUser(user);
    }
}
