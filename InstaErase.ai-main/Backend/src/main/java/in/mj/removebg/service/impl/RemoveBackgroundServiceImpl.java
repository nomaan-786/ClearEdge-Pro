package in.mj.removebg.service.impl;

import in.mj.removebg.client.ClipdropClient;
import in.mj.removebg.service.RemoveBackgroundService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class RemoveBackgroundServiceImpl implements RemoveBackgroundService {

    private final ClipdropClient clipdropClient;

    @Value("${clipdrop.api.key}")
    private String apiKey; // API key injected from application.properties

    @Override
    public byte[] removeBackground(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is null or empty");
        }
        if (apiKey == null || apiKey.isEmpty()) {
            throw new IllegalStateException("API key is not set");
        }

        try {
            log.info("Removing background for file: {}", file.getOriginalFilename());
            return clipdropClient.removeBackground(file, apiKey);
        } catch (Exception e) {
            log.error("Error removing background", e);
            throw new RuntimeException("Clipdrop background removal failed: " + e.getMessage());
        }
    }
}
