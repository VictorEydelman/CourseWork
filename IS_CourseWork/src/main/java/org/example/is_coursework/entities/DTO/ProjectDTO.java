package org.example.is_coursework.entities.DTO;

import jakarta.persistence.*;
import lombok.Data;
import org.example.is_coursework.entities.Project_Stages;
import org.example.is_coursework.entities.Project_objectives;
import org.example.is_coursework.entities.Project_purpose;
import org.example.is_coursework.entities.User;
import org.springframework.security.core.parameters.P;

import java.util.List;
@Data
public class ProjectDTO {
    Long id;
    String name;
    String description;
    Long scientific_supervisor;
    Long mentor;
    Long person_concemed;
    boolean approval;
    List<Long> students_id;
    List<Project_Stages_DTO> project_stages;
    List<String> project_objectives;
    List<String> project_purposes;
}
