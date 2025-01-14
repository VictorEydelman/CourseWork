package org.example.is_coursework.Service;

import io.minio.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.example.is_coursework.entities.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class FileService {
    private final MinioClient minioClient;
    @SneakyThrows
    public String createUserBucket(User user) {
        System.out.println(user.getLogin().toLowerCase());
        String bucket = "username" + user.getLogin().toLowerCase();
        System.out.println(bucket);
        if(!minioClient.bucketExists(BucketExistsArgs.builder()
                .bucket(bucket).build())){
            System.out.println(5555555);
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
        }
        return bucket ;
    }

    @SneakyThrows
    @Transactional
    public String uploadUserFile(MultipartFile file, User user) {
        System.out.println(111111111);
        String bucket = createUserBucket(user);
        System.out.println(222222222);
        String timestamp = String.valueOf(Instant.now().toEpochMilli());
        String extension = "";
        String fileName = file.getOriginalFilename();
        int dotIndex = fileName.lastIndexOf('.');
        System.out.println(333333333);
        if (dotIndex > 0) {
            extension = fileName.substring(dotIndex);
            fileName=fileName.substring(0, dotIndex);
        }
        System.out.println(fileName);
        System.out.println(8888888);
        minioClient.putObject(PutObjectArgs.builder()
                .bucket(bucket)
                .object(fileName + "_" + timestamp + extension)
                .contentType(file.getContentType())
                .stream(file.getInputStream(), file.getSize(), -1)
                .build());
        return fileName + "_" + timestamp + extension;

    }
    @SneakyThrows
    public byte[] readFile(String filename,User user) {
        String bucket = createUserBucket(user);
        var object = minioClient.getObject(GetObjectArgs.builder()
                .bucket(bucket)
                .object(filename)
                .build());
        return object.readAllBytes();
    }
}
