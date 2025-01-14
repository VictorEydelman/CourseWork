package org.example.is_coursework.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.context.properties.bind.Name;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Project_CourseWork")
public class Project {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String description;
    @ManyToOne
    User scientific_supervisor_user_id;
    @ManyToOne
    User mentor_user_id;
    @ManyToOne
    User person_concemed_user_id;
    boolean Approval;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "project_students_CourseWork",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> students;
}
