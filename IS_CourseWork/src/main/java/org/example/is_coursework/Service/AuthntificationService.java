package org.example.is_coursework.Service;

import lombok.AllArgsConstructor;
import org.example.is_coursework.entities.DTO.UserDTO;
import org.example.is_coursework.entities.Hash.HashUtil;
import org.example.is_coursework.entities.enums.Role;
import org.example.is_coursework.entities.User;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AuthntificationService {
    private final UserService userService;
    private final JWTService jwtService;

    public List<String> signUp(UserDTO userDTO) throws NoSuchAlgorithmException {
        String hashedPass=HashUtil.digectPassword(userDTO.getPassword());
        Role role=Role.ROLE_USER;
        Boolean sci=false;
        if(userService.sizeUsers()==0){
            role = Role.ROLE_ADMIN;
            sci=true;
        }
        var user = User.builder().login(userDTO.getLogin()).name(userDTO.getName())
                .description(userDTO.getDescription())
                .surname(userDTO.getSurname()).patronymic(userDTO.getPatronymic())
                .password(hashedPass).Role_admin(role==Role.ROLE_ADMIN)
                .roleScientificSupervisor(sci)
                .build();
        System.out.println(user);
        userService.save(user);
        List<String> result = new ArrayList<>();
        result.add(String.valueOf(user.getId()));
        result.add(jwtService.generateToken(user));
        result.add(user.getRole_admin().toString());
        result.add(user.getRoleScientificSupervisor().toString());
        return result;
    }

    public List<String> signIn(User user){
        List<String> result = new ArrayList<>();
        result.add(String.valueOf(user.getId()));
        result.add(jwtService.generateToken(user));
        result.add(String.valueOf(user.getRole_admin()));
        result.add(user.getRoleScientificSupervisor().toString());
        return result;
    }
}
