package org.example.is_coursework.Controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.is_coursework.entities.Hash.HashUtil;
import org.example.is_coursework.entities.DTO.UserDTO;
import org.example.is_coursework.entities.User;
import org.example.is_coursework.Service.AuthntificationService;
import org.example.is_coursework.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final AuthntificationService authntificationService;
    private final UserService userService;

    @PutMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<String>> reg(@Valid @RequestBody UserDTO userDTO) throws NoSuchAlgorithmException {
        User user = userService.getByLogin(userDTO.getLogin());
        if (user == null) {
            List<String> n=authntificationService.signUp(userDTO);
            return ResponseEntity.ok(n);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping(value = "/avtorization",produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<String>> avt(@Valid @RequestBody UserDTO userDTO) throws NoSuchAlgorithmException {
        String hashedPass= HashUtil.digectPassword(userDTO.getPassword());
        User user = userService.getByLoginAndPassword(userDTO.getLogin(), hashedPass);
        System.out.println(userDTO);
        System.out.println(user);
        if(user != null){
            List<String> n = authntificationService.signIn(user);
            return ResponseEntity.ok(n);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/getusers",produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<User>> getUsers() throws NoSuchAlgorithmException {
        return new ResponseEntity<>(userService.getAll(),HttpStatus.OK);
    }
    @GetMapping(value = "/get_scientific_supervisor",produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<List<User>> getScientificSupervisor(HttpServletRequest request) throws NoSuchAlgorithmException {
        return new ResponseEntity<>(userService.getAllByScientific_supervisor(),HttpStatus.OK);
    }

}