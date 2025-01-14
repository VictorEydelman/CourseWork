package org.example.is_coursework;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.security.GeneralSecurityException;

@SpringBootApplication
public class IsCourseWorkApplication {

    public static void main(String[] args) throws GeneralSecurityException, IOException {
        //DocsQuickstart.main();
        SpringApplication.run(IsCourseWorkApplication.class, args);
    }

}
