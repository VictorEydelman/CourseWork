package org.example.is_coursework.entities.DTO;

import lombok.Data;
import java.sql.Date;
import java.util.List;

@Data
public class Project_Stages_DTO {
    Long id;
    Long project_id;
    String name;
    Date deadline;
    boolean Approval_by_mentor;
    boolean Approval_by_scientific_supervisor;
    List<String> objectives;
}
