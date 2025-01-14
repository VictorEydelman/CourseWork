package org.example.is_coursework.Service;

import org.example.is_coursework.entities.DTO.ProjectDTO;
import org.example.is_coursework.entities.Project;
import org.example.is_coursework.entities.User;

import java.util.ArrayList;
import java.util.List;

public class ProjectBuilder {

    public static Project add(ProjectDTO projectDTO, UserService userService){
        List<User> students = new ArrayList<>();
        for (Long i: projectDTO.getStudents_id()){
            User user = userService.getById(i);
            students.add(user);
        }
        User scientific_supervisor;
        if(projectDTO.getScientific_supervisor()==null){
            scientific_supervisor=null;
        } else {
            scientific_supervisor= userService.getById(projectDTO.getScientific_supervisor());
        }
        return Project.builder().name(projectDTO.getName()).description(projectDTO.getDescription())
                .Approval(false)
                .scientific_supervisor_user_id(scientific_supervisor)
                .students(students)
                .build();
    }

    public static Project update(ProjectDTO projectDTO, UserService userService){
        List<User> students = new ArrayList<>();
        for (Long i: projectDTO.getStudents_id()){
            User user = userService.getById(i);
            students.add(user);
        }
        User mentor = userService.getById(projectDTO.getMentor());
        User person_concemed = userService.getById(projectDTO.getPerson_concemed());
        User scientific_supervisor = userService.getById(projectDTO.getScientific_supervisor());
        return Project.builder().name(projectDTO.getName()).description(projectDTO.getDescription())
                .Approval(projectDTO.isApproval()).id(projectDTO.getId())
                .mentor_user_id(mentor)
                .person_concemed_user_id(person_concemed)
                .scientific_supervisor_user_id(scientific_supervisor)
                .students(students).build();
    }

    public static Project update_approval(ProjectDTO projectDTO,Project project, UserService userService){
        User person_concemed =null;
        if(projectDTO.getPerson_concemed()!=null){
            person_concemed = userService.getById(projectDTO.getPerson_concemed());
        }
        User mentor=project.getMentor_user_id();
        if(mentor==null){
            mentor = userService.getById(projectDTO.getMentor());
        }
        return Project.builder().name(project.getName()).description(project.getDescription())
                .Approval(true)
                .scientific_supervisor_user_id(project.getScientific_supervisor_user_id())
                .students(project.getStudents())
                .person_concemed_user_id(person_concemed)
                .mentor_user_id(mentor).id(project.getId())
                .build();
    }
}
