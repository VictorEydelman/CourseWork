package org.example.is_coursework.entities.DTO;

import com.google.api.services.drive.model.File;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;
import org.example.is_coursework.entities.Project_Stages;
import org.example.is_coursework.entities.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
public class Intermediate_result_DTO {
    Long id;
    Project_Stages projectstages;
    String description;
    byte[] file;
    boolean Approval_by_curator;
    User user;
}
