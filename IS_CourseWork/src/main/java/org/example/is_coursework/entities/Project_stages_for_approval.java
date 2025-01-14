package org.example.is_coursework.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Project_stages_for_approval_CourseWork")
public class Project_stages_for_approval {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    Project_Stages project_stages;
    String link;
    Date date;
}
