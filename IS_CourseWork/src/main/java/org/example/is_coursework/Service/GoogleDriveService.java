/*package org.example.is_coursework.Service;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;

@Service
public class GoogleDriveService {

    private final Drive driveService;

    @Autowired
    public GoogleDriveService(Drive driveService) {
        this.driveService = driveService;
    }

    public String uploadFile(File fileMetadata) throws IOException {
        File file = driveService.files().create(fileMetadata)
                .setFields("id")
                .execute();
        String fileId = file.getId();
        String fileLink = "https://drive.google.com/file/d/" + fileId + "/view";
        return fileLink;
    }
}*/
