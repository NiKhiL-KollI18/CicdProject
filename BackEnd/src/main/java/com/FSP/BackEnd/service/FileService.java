package com.FSP.BackEnd.service;

import com.FSP.BackEnd.model.FileEntity;
import com.FSP.BackEnd.repository.FileRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class FileService {

    private final FileRepository fileRepository;
    private final String uploadDir = "uploads";
    // Get the absolute path of the project's root directory
    private final String projectRoot = System.getProperty("user.dir");

    public FileService(FileRepository repo) {
        this.fileRepository = repo;
        // Create a File object with the absolute path
        File uploadDirectory = new File(projectRoot, uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }
    }

    public FileEntity saveFile(MultipartFile file) {
        // Build the absolute file path using the project root
        String filePath = projectRoot + File.separator + uploadDir + File.separator + file.getOriginalFilename();
        try {
            file.transferTo(new File(filePath));
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }

        FileEntity fileEntity = new FileEntity();
        fileEntity.setFilename(file.getOriginalFilename());
        fileEntity.setFileType(file.getContentType());
        fileEntity.setSize(file.getSize());
        fileEntity.setPath(filePath); // Store the absolute path in the database

        return fileRepository.save(fileEntity);
    }
    
    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }

    public FileEntity generateShareLink(Long fileId) {
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        String link = "http://localhost:8082/files/share/" + file.getId();
        file.setShareLink(link);

        return fileRepository.save(file);
    }

    public void deleteFile(Long fileId) {
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
        // Use the absolute path stored in the database
        new File(file.getPath()).delete();
        fileRepository.delete(file);
    }
    public FileEntity getFileById(Long fileId) {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found with ID: " + fileId));
    }
}