package de.ait.javaproglessonspro.controllers;

import de.ait.javaproglessonspro.enums.ClientDocumentType;
import de.ait.javaproglessonspro.model.ClientDocumentDb;
import de.ait.javaproglessonspro.service.ClientDocumentDbService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
@Slf4j
public class ClientDocumentController {

    private final ClientDocumentDbService service;

    // -----------------------------------------
    // UPLOAD
    // -----------------------------------------
    @PostMapping(value = "/documents", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ClientDocumentDb> uploadClientDocument(
            @RequestParam String clientEmail,
            @RequestParam ClientDocumentType docType,
            @RequestParam MultipartFile file) {

        ClientDocumentDb saved = service.uploadDocument(clientEmail, docType, file);
        log.info("Client document {} saved for {}", saved.getId(), clientEmail);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // -----------------------------------------
    // DOWNLOAD (email + type)
    // -----------------------------------------
    @GetMapping("/documents")
    public ResponseEntity<byte[]> downloadClientDocument(
            @RequestParam String clientEmail,
            @RequestParam ClientDocumentType docType) {

        ClientDocumentDb doc = service.getDocument(clientEmail, docType);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + doc.getOriginalFileName() + "\"")
                .contentType(MediaType.parseMediaType(doc.getContentType()))
                .body(doc.getData());
    }

    // -----------------------------------------
    // DELETE BY ID
    // -----------------------------------------
    @DeleteMapping("/documents/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        service.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
}


