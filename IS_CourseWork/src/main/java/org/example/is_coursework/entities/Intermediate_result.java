package org.example.is_coursework.entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Intermediate_result_CourseWork")
public class Intermediate_result {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    Project_Stages projectstages;
    String description;
    String link;
    boolean Approval_by_curator;
    @ManyToOne
    User user;
}
