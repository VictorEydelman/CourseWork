package org.example.is_coursework.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.minio.MinioClient;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class MinioProperty {
    private String port="9000";
    private String accessKey="E46bHvbwTiYKXXxmuyk7";
    private final String secretKey="xEvIaaAzKIXV98nFYaSAgd9lc0raC1DIPl2HLIoB";
    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder().endpoint("http://localhost:"+port)
                .credentials(accessKey, secretKey).build();
    }
    public ObjectMapper objectMapper(){
        var objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(JsonParser.Feature.ALLOW_COMMENTS, true);
        return objectMapper;
    }
}
