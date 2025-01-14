package org.example.is_coursework.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Project_Stages_CourseWork")
public class Project_Stages {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    Project project;
    String name;
    Date deadline;
    boolean Approval_by_mentor;
    boolean Approval_by_scientific_supervisor;
}
