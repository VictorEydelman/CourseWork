package org.example.is_coursework.entities.DTO;

import lombok.Builder;
import lombok.Data;
import org.example.is_coursework.entities.Project;

import java.util.Date;

@Data
@Builder
public class Notification_Req {
    String description;
    Project project;
    Date date;
}