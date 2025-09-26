package com.FSP.BackEnd.controller;

import com.FSP.BackEnd.model.FileEntity;
import com.FSP.BackEnd.service.FileService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "*") // <-- ADD THIS LINE to allow requests from the frontend
@RestController
@RequestMapping("/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService service) {
        this.fileService = service;
    }

    @PostMapping("/upload")
    public FileEntity uploadFile(@RequestParam("file") MultipartFile file) {
        return fileService.saveFile(file);
    }

    @GetMapping
    public List<FileEntity> getAllFiles() {
        return fileService.getAllFiles();
    }

    @PostMapping("/share/{id}")
    public FileEntity generateShareLink(@PathVariable Long id) {
        return fileService.generateShareLink(id);
    }
    
    // New endpoint to handle file downloads via a share link
    @GetMapping("/share/{id}")
    public ResponseEntity<Resource> serveFile(@PathVariable Long id) {
        FileEntity fileEntity = fileService.getFileById(id);
        Path path = Paths.get(fileEntity.getPath());
        Resource resource = new FileSystemResource(path.toFile());

        // Check if the file exists
        if (!resource.exists() || !resource.isReadable()) {
            // Log the issue and return a not-found status
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getFilename() + "\"");
        headers.add(HttpHeaders.CONTENT_TYPE, fileEntity.getFileType());

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(fileEntity.getSize())
                .body(resource);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFile(@PathVariable Long id) {
        fileService.deleteFile(id);
    }
}
