package de.ait.javaproglessonspro.service;

import de.ait.javaproglessonspro.enums.ClientDocumentType;
import de.ait.javaproglessonspro.model.ClientDocumentDb;
import de.ait.javaproglessonspro.repository.ClientDocumentDbRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClientDocumentDbService {

    private final ClientDocumentDbRepository clientDocumentDbRepository;

    public ClientDocumentDb uploadDocument(String clientEmail,
                                           ClientDocumentType docType,
                                           MultipartFile file) {

        validateUpload(clientEmail, docType, file);

        try {
            String originalName = file.getOriginalFilename();
            String extension = extractExtension(originalName);
            String uuidName = UUID.randomUUID() + extension;

            ClientDocumentDb document = ClientDocumentDb.builder()
                    .clientEmail(clientEmail)
                    .docType(docType)
                    .contentType(file.getContentType())
                    .size(file.getSize())
                    .originalFileName(originalName)
                    .fileName(uuidName)
                    .data(file.getBytes())
                    .build();

            ClientDocumentDb saved = clientDocumentDbRepository.save(document);

            log.info("Client document saved: email={}, type={}, uuid={}",
                    clientEmail, docType, uuidName);

            return saved;

        } catch (IOException e) {
            log.error("Error saving client document for {}: {}", clientEmail, e.getMessage(), e);
            throw new RuntimeException("File upload failed", e);
        }
    }

    public ClientDocumentDb getDocument(String clientEmail, ClientDocumentType docType) {
        return clientDocumentDbRepository.findByClientEmailAndDocType(clientEmail, docType)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Document of type " + docType + " not found for client " + clientEmail
                ));
    }

    public void deleteDocument(Long id) {
        if (!clientDocumentDbRepository.existsById(id)) {
            throw new IllegalArgumentException("Document not found: " + id);
        }

        clientDocumentDbRepository.deleteById(id);
        log.info("Client document deleted: id={}", id);
    }

    private void validateUpload(String clientEmail,
                                ClientDocumentType docType,
                                MultipartFile file) {

        if (clientEmail == null || clientEmail.isBlank()) {
            throw new IllegalArgumentException("Client email must not be empty");
        }

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file must not be empty");
        }

        if (clientDocumentDbRepository.existsByClientEmailAndDocType(clientEmail, docType)) {
            throw new IllegalStateException(
                    "Document of type " + docType + " already exists for client " + clientEmail
            );
        }
    }

    private String extractExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf("."));
    }
}


