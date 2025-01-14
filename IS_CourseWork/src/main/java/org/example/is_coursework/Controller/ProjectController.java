package org.example.is_coursework.Controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.is_coursework.Service.*;
import org.example.is_coursework.entities.*;
import org.example.is_coursework.entities.DTO.*;
import org.example.is_coursework.entities.Hash.HashUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/project")
public class ProjectController {
    private final JWTService jwtService;
    private final UserService userService;
    private final ProjectService projectService;
    private final Project_for_approval_Service project_for_approval_Service;
    private final Project_Stages_Service project_stages_service;
    private final Project_objectives_Service project_objectives_service;
    private final Project_purpose_Service project_purpose_service;
    private final Objectives_stage_Service objectives_stage_service;
    private final Project_stage_for_approvalService project_stage_for_approvalService;

    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> add(@Valid @RequestBody ProjectDTO projectDTO, HttpServletRequest request) {
        try {
            //User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            Project project = ProjectBuilder.add(projectDTO,userService);
            projectService.save(project);
            Project_for_approval project_for_approval = Project_for_approval.builder()
                    .date(new Date(System.currentTimeMillis()))
                    .project(project).link(project.getName()).build();
            project_for_approval_Service.save(project_for_approval);

            for(String project_objectives_dto: projectDTO.getProject_objectives()){
                Project_objectives project_objectives = Project_objectives.builder()
                        .description(project_objectives_dto).project(project).build();
                project_objectives_service.save(project_objectives);
            }


            for(String project_purpose_dto: projectDTO.getProject_purposes()){
                Project_purpose project_purpose = Project_purpose.builder()
                        .description(project_purpose_dto).project(project).build();
                project_purpose_service.save(project_purpose);
            }
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> update(@Valid @RequestBody ProjectDTO projectDTO, HttpServletRequest request) {
        try {
            User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            Project project = ProjectBuilder.update(projectDTO,userService);
            projectService.updateProject(project);
            project_purpose_service.delete(project);
            project_objectives_service.delete(project);
            for(String project_objectives_dto: projectDTO.getProject_objectives()){
                Project_objectives project_objectives = Project_objectives.builder()
                        .description(project_objectives_dto).project(project).build();
                project_objectives_service.save(project_objectives);
            }
            for(String project_purpose_dto: projectDTO.getProject_purposes()){
                Project_purpose project_purpose = Project_purpose.builder()
                        .description(project_purpose_dto).project(project).build();
                project_purpose_service.save(project_purpose);
            }
            return new ResponseEntity<>(project.getId().toString(),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/updatestudent", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> updatestudent(@Valid @RequestBody ProjectDTO projectDTO, HttpServletRequest request) {
        try {
            List<User> students=new ArrayList<>();
            for(Long i:projectDTO.getStudents_id()){
                students.add(userService.getById(i));
            }
            Project project = projectService.getProject(projectDTO.getId());
            project.setStudents(students);
            projectService.updateProject(project);
            return new ResponseEntity<>(project.getId().toString(),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/updatesci", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> updatesci(@Valid @RequestBody ProjectDTO projectDTO, HttpServletRequest request) {
        try {
            Project project = projectService.getProject(projectDTO.getId());
            project.setScientific_supervisor_user_id(userService.getById(projectDTO.getScientific_supervisor()));
            projectService.updateProject(project);
            return new ResponseEntity<>(project.getId().toString(),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/updatementor", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> updatementor(@Valid @RequestBody ProjectDTO projectDTO, HttpServletRequest request) {
        try {
            Project project = projectService.getProject(projectDTO.getId());
            project.setMentor_user_id(userService.getById(projectDTO.getMentor()));
            projectService.updateProject(project);
            return new ResponseEntity<>(project.getId().toString(),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/updateper", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> updateper(@Valid @RequestBody ProjectDTO projectDTO, HttpServletRequest request) {
        try {
            Project project = projectService.getProject(projectDTO.getId());
            project.setPerson_concemed_user_id(userService.getById(projectDTO.getPerson_concemed()));
            projectService.updateProject(project);
            return new ResponseEntity<>(project.getId().toString(),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/deletestudent", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> deletestudent(@Valid @RequestBody ProjectstudentDTO projectstudentDTO, HttpServletRequest request) {
        try {
            Project project = projectService.getProject(projectstudentDTO.getProject());
            User user=userService.getById(projectstudentDTO.getStudent());
            List<User> students = project.getStudents();
            students.remove(user);
            project.setStudents(students);
            projectService.updateProject(project);
            return new ResponseEntity<>(project.getId().toString(),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/approval", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> approval(@Valid @RequestBody ProjectDTO projectDTO, HttpServletRequest request) {
        try {
            User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            if(projectDTO.isApproval()) {
                Project project = projectService.getProject(projectDTO.getId());
                Project update_project = ProjectBuilder.update_approval(projectDTO, project,userService);
                projectService.updateProject(update_project);

                for(Project_Stages_DTO project_stages_dto: projectDTO.getProject_stages()){
                    Project_Stages project_stages = Project_Stages.builder().name(project_stages_dto.getName())
                                    .project(project)
                                    .deadline(project_stages_dto.getDeadline())
                                    .Approval_by_mentor(false)
                                    .Approval_by_scientific_supervisor(false).build();
                    project_stages_service.save(project_stages);
                    for(String objectivesDto:project_stages_dto.getObjectives()){
                        Objectives_stage objectivesStage = Objectives_stage.builder().projectstages(project_stages)
                                .description(objectivesDto).build();
                        objectives_stage_service.save(objectivesStage);
                    }
                }
            }
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/updateprofile",produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> updateprofile(@Valid @RequestBody UserDTO userDTO, HttpServletRequest request) {
        try {
            User user1 = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            User user = User.builder().id(userDTO.getId()).login(userDTO.getLogin()).name(userDTO.getName()).password(user1.getPassword())
                    .surname(userDTO.getSurname()).patronymic(userDTO.getPatronymic()).Role_admin(user1.getRole_admin())
                    .roleScientificSupervisor(user1.getRoleScientificSupervisor()).description(userDTO.getDescription()).build();
            userService.save(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping(value = "/getbyuser", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<Project>> getbyuser(HttpServletRequest request) {
        try {
            User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            return new ResponseEntity<>(projectService.getByUser(user),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/getbyid/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<Project> getbyid(@PathVariable long id,HttpServletRequest request) {
        try {
            return new ResponseEntity<>(projectService.getProject(id),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/getproject_objectives/{Project_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<Project_objectives>> getproject_objectives(@PathVariable long Project_id,HttpServletRequest request) {
        try {
            Project project = projectService.getProject(Project_id);
            List<Project_objectives> project_objectives = project_objectives_service.getByProject(project);
            //User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            return new ResponseEntity<>(project_objectives,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/getproject_purposes/{Project_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<Project_purpose>> getproject_purposes(@PathVariable long Project_id,HttpServletRequest request) {
        try {
            Project project = projectService.getProject(Project_id);
            List<Project_purpose> project_purposes = project_purpose_service.getByProject(project);
            //User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            return new ResponseEntity<>(project_purposes,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping(value = "/scientific_supervisor/{user_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> scientific_supervisor(@PathVariable long user_id,HttpServletRequest request) throws NoSuchAlgorithmException {
        User user = userService.getById(user_id);
        User admin= userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
        if (admin.getRole_admin()) {
            user.setRoleScientificSupervisor(true);
            userService.save(user);
            return ResponseEntity.ok("j");
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PutMapping(value = "/admin/{user_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> admin(@PathVariable long user_id,HttpServletRequest request) throws NoSuchAlgorithmException {
        User user = userService.getById(user_id);
        User admin= userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
        if (admin.getRole_admin()) {
            user.setRole_admin(true);
            userService.save(user);
            return ResponseEntity.ok("j");
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping(value = "/getnotification", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<Notification_Req>> getnotification(HttpServletRequest request) {
        try {
            User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            List<Project_for_approval> project_for_approvals = project_for_approval_Service.getAllbyUser(user.getId());
            List<Project_stages_for_approval> project_stages_for_approvals = project_stage_for_approvalService.getAllbyUser(user.getId());
            List<Notification_Req> notification_reqs = new ArrayList<>();
            for (Project_for_approval project_for_approval : project_for_approvals) {
                Notification_Req notificationReq = Notification_Req.builder().project(project_for_approval.getProject())
                        .date(project_for_approval.getDate()).description("Подана заявка на утверждение проекта: "+project_for_approval.getLink()).build();
                notification_reqs.add(notificationReq);
            }
            for (Project_stages_for_approval project_stages_for_approval : project_stages_for_approvals) {
                Notification_Req notificationReq = Notification_Req.builder().project(project_stages_for_approval.getProject_stages().getProject())
                        .date(project_stages_for_approval.getDate()).description("Подана заявка на утверждение этапа проекта: "+project_stages_for_approval.getLink()).build();
                notification_reqs.add(notificationReq);
            }
            notification_reqs.sort((p1, p2) -> p1.getDate().compareTo(p2.getDate()));
            //User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            return new ResponseEntity<>(notification_reqs,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
