package de.ait.javaproglessonspro.service;

import de.ait.javaproglessonspro.enums.CarDocumentType;
import de.ait.javaproglessonspro.model.Car;
import de.ait.javaproglessonspro.model.CarDocumentOs;
import de.ait.javaproglessonspro.repository.CarDocumentOsRepository;
import de.ait.javaproglessonspro.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CarDocumentOsService {

    private final CarRepository carRepository;
    private final CarDocumentOsRepository carDocumentOsRepository;

    @Value("${app.uploads.cars:/var/app/uploads/cars}")
    private String basePath;

    public CarDocumentOs uploadDocument(Long carId,
                                        CarDocumentType docType,
                                        MultipartFile file) {

        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found: " + carId));

        if (carDocumentOsRepository.existsByCarIdAndDocType(carId, docType)) {
            throw new IllegalStateException("Document of type " + docType + " already exists for car " + carId);
        }

        validateFile(file);

        try {
            String originalName = file.getOriginalFilename();
            String extension = extractExtension(originalName);
            String storedName = UUID.randomUUID() + extension;

            Path carFolder = Paths.get(basePath, String.valueOf(carId));
            Files.createDirectories(carFolder);

            Path storedPath = carFolder.resolve(storedName);
            Files.copy(file.getInputStream(), storedPath, StandardCopyOption.REPLACE_EXISTING);

            CarDocumentOs document = new CarDocumentOs(
                    car,
                    storedPath.toString(),
                    file.getSize(),
                    file.getContentType(),
                    storedName,
                    originalName,
                    docType
            );

            CarDocumentOs saved = carDocumentOsRepository.save(document);

            log.info("Uploaded car document: carId={}, type={}, storedName={}", carId, docType, storedName);

            return saved;

        } catch (IOException e) {
            log.error("Error saving file for car {}: {}", carId, e.getMessage(), e);
            throw new RuntimeException("File upload failed", e);
        }
    }

    public byte[] downloadDocument(Long documentId) {
        CarDocumentOs doc = getDocument(documentId);

        try {
            return Files.readAllBytes(Paths.get(doc.getStoragePath()));
        } catch (IOException e) {
            log.error("Error reading file {}: {}", doc.getStoragePath(), e.getMessage(), e);
            throw new RuntimeException("File read failed", e);
        }
    }

    public void deleteDocument(Long documentId) {
        CarDocumentOs doc = getDocument(documentId);

        try {
            Files.deleteIfExists(Paths.get(doc.getStoragePath()));
            carDocumentOsRepository.delete(doc);

            log.info("Deleted car document: id={}, carId={}, type={}",
                    documentId, doc.getCar().getId(), doc.getDocType());

        } catch (IOException e) {
            log.error("Error deleting file {}: {}", doc.getStoragePath(), e.getMessage(), e);
            throw new RuntimeException("File delete failed", e);
        }
    }

    public List<CarDocumentOs> getDocumentsForCar(Long carId) {
        if (!carRepository.existsById(carId)) {
            throw new IllegalArgumentException("Car not found: " + carId);
        }

        return carDocumentOsRepository.findByCarId(carId);
    }

    public CarDocumentOs getDocumentByType(Long carId, CarDocumentType type) {
        return carDocumentOsRepository.findByCarIdAndDocType(carId, type)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Document of type " + type + " not found for car " + carId
                ));
    }

    public CarDocumentOs getDocument(Long documentId) {
        return carDocumentOsRepository.findById(documentId)
                .orElseThrow(() -> new IllegalArgumentException("Document not found: " + documentId));
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is empty");
        }
        if (file.getOriginalFilename() == null) {
            throw new IllegalArgumentException("File must have a name");
        }
    }

    private String extractExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf("."));
    }
}


