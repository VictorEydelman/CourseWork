package org.example.is_coursework.Controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.is_coursework.Service.*;
import org.example.is_coursework.entities.Comments;
import org.example.is_coursework.entities.DTO.CommentsDTO;
import org.example.is_coursework.entities.DTO.Intermediate_result_DTO;
import org.example.is_coursework.entities.Intermediate_result;
import org.example.is_coursework.entities.Project_Stages;
import org.example.is_coursework.entities.User;
import org.example.is_coursework.repository.Project_intermediate_result_Repository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/comments")
public class CommentsController {
    private final JWTService jwtService;
    private final UserService userService;
    private final CommentsService commentsService;
    private final Intermediate_result_Service intermediate_result_service;
    @PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<String> add(@Valid @RequestBody CommentsDTO commentsDTO, HttpServletRequest request) {
        try {
            System.out.println(commentsDTO);
            User user = userService.getByLogin(jwtService.extractUsername(jwtService.resolveToken(request)));
            Intermediate_result intermediate_result = intermediate_result_service.getById(commentsDTO.getIntermediateresult());
            Comments comments =Comments.builder().description(commentsDTO.getDescription())
                            .user(user).intermediateresult(intermediate_result).build();
            System.out.println(comments);
            commentsService.save(comments);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Ошибка добавления",HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/get/{intermediate_result}", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<Comments>> getbyprojectStages(@PathVariable long intermediate_result, HttpServletRequest request) {
        try {
            return new ResponseEntity<>(commentsService.getByIntermediate_result_Id(intermediate_result),HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}