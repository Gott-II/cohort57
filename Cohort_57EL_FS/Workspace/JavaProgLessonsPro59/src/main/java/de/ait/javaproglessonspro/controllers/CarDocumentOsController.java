package de.ait.javaproglessonspro.controllers;

import de.ait.javaproglessonspro.enums.CarDocumentType;
import de.ait.javaproglessonspro.model.CarDocumentOs;
import de.ait.javaproglessonspro.service.CarDocumentOsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/cars/{carId}/documents")
@RequiredArgsConstructor
@Slf4j
public class CarDocumentOsController {

    private final CarDocumentOsService carDocumentOsService;

    @PostMapping(value = "/{docType}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CarDocumentOs> uploadDocument(
            @PathVariable Long carId,
            @PathVariable CarDocumentType docType,
            @RequestParam("file") MultipartFile file
    ) {
        log.info("Uploading document: carId={}, type={}, file={}", carId, docType, file.getOriginalFilename());

        CarDocumentOs saved = carDocumentOsService.uploadDocument(carId, docType, file);

        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{documentId}/download")
    public ResponseEntity<byte[]> downloadDocument(
            @PathVariable Long carId,
            @PathVariable Long documentId
    ) {
        CarDocumentOs doc = carDocumentOsService.getDocument(documentId);

        if (!doc.getCar().getId().equals(carId)) {
            throw new IllegalArgumentException("Document does not belong to this car");
        }

        byte[] data = carDocumentOsService.downloadDocument(documentId);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + doc.getOriginalFileName() + "\"")
                .contentType(MediaType.parseMediaType(doc.getContentType()))
                .body(data);
    }


    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable Long carId,
            @PathVariable Long documentId
    ) {
        CarDocumentOs doc = carDocumentOsService.getDocument(documentId);

        validateCarOwnership(carId, doc);

        carDocumentOsService.deleteDocument(documentId);

        log.info("Deleted document: id={}, carId={}, type={}", documentId, carId, doc.getDocType());

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<CarDocumentOs>> getDocuments(@PathVariable Long carId) {
        List<CarDocumentOs> docs = carDocumentOsService.getDocumentsForCar(carId);
        return ResponseEntity.ok(docs);
    }

    private void validateCarOwnership(Long carId, CarDocumentOs doc) {
        if (!doc.getCar().getId().equals(carId)) {
            log.warn("Document {} does not belong to car {}", doc.getId(), carId);
            throw new IllegalArgumentException("Document does not belong to this car");
        }
    }
}


