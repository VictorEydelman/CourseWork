package org.example.is_coursework.entities.DTO;

import jakarta.validation.constraints.Size;
import lombok.Data;
import org.example.is_coursework.entities.enums.Role;

@Data
public class UserDTO {
    Long id;
    String name;
    String surname;
    String patronymic;
    String login;
    String password;
    String description;
    Boolean Role_admin;
    Boolean Role_scientific_supervisor;
}
