package org.example.is_coursework.entities.DTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.example.is_coursework.entities.Project;

import java.sql.Date;
@Data
@Builder
public class Project_Stages_Req {
    Long id;
    Project project;
    String name;
    Date deadline;
    boolean Approval_by_mentor;
    boolean Approval_by_scientific_supervisor;
}
