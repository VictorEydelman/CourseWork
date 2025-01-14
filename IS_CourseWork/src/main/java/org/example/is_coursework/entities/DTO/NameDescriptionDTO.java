package org.example.is_coursework.entities.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NameDescriptionDTO {
    Long id;
    String name;
    String description;
}
