package org.example.is_coursework.entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Comments_CourseWork")
public class Comments {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    Intermediate_result intermediateresult;
    String description;
    @ManyToOne
    User user;
}
