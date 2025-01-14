package org.example.is_coursework.Controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.is_coursework.Service.*;
import org.example.is_coursework.entities.*;
import org.example.is_coursework.entities.DTO.Intermediate_result_DTO;
import org.example.is_coursework.entities.DTO.Project_Stages_Req;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/stage")
public class StageController {
    private final JWTService jwtService;
    private final UserService userService;
    private final Project_Stages_Service project_stages_service;
    private final Intermediate_result_Service intermediate_result_service;
    private final Project_stage_for_approvalService project_stage_for_approvalService;
    private final Objectives_stage_Service objectives_stage_service;
    private final FileService fileService;
    @PostMapping(value = "/add_intermediate_result",consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> add_intermediate_result(@RequestParam("files") List<MultipartFile> files,
                                                           @RequestParam("description") String description,
                                                           @RequestParam("project_stages") Long project_stage, HttpServletRequest request) {
        try {
            User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            StringBuilder filename= new StringBuilder();
            for(var file:files){
                if(file!=files.get(0)){
                    filename.append(",");
                }
                filename.append(fileService.uploadUserFile(file, user));
            }
            Project_Stages project_stages = project_stages_service.getById(project_stage);
            Intermediate_result intermediate_result = Intermediate_result.builder()
                    .description(description)
                    .link(filename.toString())
                    .projectstages(project_stages).user(user)
                    .Approval_by_curator(false).build();
            intermediate_result_service.save(intermediate_result);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/getstage/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<Project_Stages_Req> getstage(@PathVariable long id,HttpServletRequest request) {
        try {
            Project_Stages project_stages = project_stages_service.getById(id);
            Project_Stages_Req projectStagesReq = Project_Stages_Req.builder().name(project_stages.getName()).deadline(project_stages.getDeadline())
                    .project(project_stages.getProject()).Approval_by_mentor(project_stages.isApproval_by_mentor())
                    .Approval_by_scientific_supervisor(project_stages.isApproval_by_scientific_supervisor())
                    .id(project_stages.getId()).build();
            return new ResponseEntity<>(projectStagesReq,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/getbyuserandproject/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<Project_Stages>> getbyuserandproject(@PathVariable long id,HttpServletRequest request) {
        try {
            return new ResponseEntity<>(project_stages_service.getbyproject(id),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/getObjectives_stage/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<Objectives_stage>> getObjectives_stage(@PathVariable long id,HttpServletRequest request) {
        try {
            return new ResponseEntity<>(objectives_stage_service.getByProjectStages(id),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/getbyprojectStages/{project_stage}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<Intermediate_result>> getbyprojectStages(@PathVariable long project_stage,HttpServletRequest request) {
        try {
            return new ResponseEntity<>(intermediate_result_service.getByProject_stages(project_stage),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/download/{filename}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<byte[]> getbyprojectStages(@PathVariable String filename,HttpServletRequest request) {
        try {
            User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            return new ResponseEntity<>(fileService.readFile(filename,user),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/approvalIntermediate/{Intermediate_Result}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> approvalIntermediate(@PathVariable long Intermediate_Result, HttpServletRequest request) {
        try {
            User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            Intermediate_result intermediate_result1 = intermediate_result_service.getById(Intermediate_Result);
            Project_Stages project_stages = intermediate_result1.getProjectstages();
            Project project = project_stages.getProject();
            if(user.getRole_admin() || project.getMentor_user_id()==user || project.getScientific_supervisor_user_id()==user) {
                intermediate_result1.setApproval_by_curator(true);
                intermediate_result_service.save(intermediate_result1);
                return new ResponseEntity<>(HttpStatus.CREATED);
            } else{
                return new ResponseEntity<>("Невозможно",HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/approvalStagesMentor/{Project_stages}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> approvalStagesMentor(@PathVariable long Project_stages, HttpServletRequest request) {
        try {
            User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            Project_Stages project_stage = project_stages_service.getById(Project_stages);
            Project project = project_stage.getProject();
            if(user.getRole_admin() || project.getMentor_user_id()==user || project.getScientific_supervisor_user_id()==user) {
                project_stage.setApproval_by_mentor(true);
                project_stages_service.save(project_stage);
                Project_stages_for_approval project_stage_for_approval=Project_stages_for_approval.builder()
                        .project_stages(project_stage).date(new Date()).link(project.getName()+"/"+project_stage.getName()).build();
                project_stage_for_approvalService.save(project_stage_for_approval);
                return new ResponseEntity<>(HttpStatus.CREATED);
            } else{
                return new ResponseEntity<>("Невозможно",HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/approvalStagesScientific_supervisor/{Project_stages}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> approvalStagesscientific_supervisor(@PathVariable long Project_stages, HttpServletRequest request) {
        try {
            User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            Project_Stages project_stage = project_stages_service.getById(Project_stages);
            Project project = project_stage.getProject();
            if(user.getRole_admin() || project.getScientific_supervisor_user_id()==user) {
                project_stage.setApproval_by_scientific_supervisor(true);
                project_stage.setApproval_by_mentor(true);
                project_stages_service.save(project_stage);
                return new ResponseEntity<>(HttpStatus.CREATED);
            } else{
                return new ResponseEntity<>("Невозможно",HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
}