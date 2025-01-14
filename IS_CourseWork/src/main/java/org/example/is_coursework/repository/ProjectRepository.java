package org.example.is_coursework.repository;

import org.example.is_coursework.entities.Project;
import org.example.is_coursework.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findById(long id);
    //List<Project> findAllByScientific_supervisor_user_id(User supervisor);
    //List<Project> findAllByMentor_user_id(User supervisor);
    //List<Project> findAllByPerson_concemed_user_id(User supervisor);
    //List<Project> findAllByStudents(User student);
    @Query("SELECT p FROM Project p WHERE p.scientific_supervisor_user_id = :user OR " +
            "p.mentor_user_id = :user OR " +
            "p.person_concemed_user_id = :user OR " +
            ":user MEMBER OF p.students ")
    List<Project> findAllByUser(@Param("user") User user);
    //void updateById(long id, Project project);
}
