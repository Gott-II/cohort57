package de.ait.javaproglessonspro.validation;

import de.ait.javaproglessonspro.model.Car;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class CarValidator {

    public boolean isValid(Car car) {
        return validateWithErrors(car).isEmpty();
    }

    public List<String> validateWithErrors(Car car) {

        List<String> errors = new ArrayList<>();

        if (car == null) {
            errors.add("Auto-Objekt darf nicht null sein");
            log.warn("Ungültiges Auto: Objekt ist null");
            return errors;
        }

        // String-Felder prüfen
        validateString(car.getBrand(), "Marke", errors);
        validateString(car.getModel(), "Modell", errors);
        validateString(car.getColor(), "Farbe", errors);

        // Zahlenfelder prüfen
        validateMin(car.getProductionYear(), 1900, "Baujahr", errors);
        validateMin(car.getMileage(), 0, "Kilometerstand", errors);
        validateMin(car.getPrice(), 1, "Preis", errors);
        validateMin(car.getHorsepower(), 1, "PS", errors);

        // Enum-Felder prüfen
        if (car.getStatus() == null) {
            errors.add("Status darf nicht null sein");
        }

        if (car.getFuelType() == null) {
            errors.add("Kraftstofftyp darf nicht null sein");
        }

        if (car.getTransmission() == null) {
            errors.add("Getriebe darf nicht null sein");
        }

        if (!errors.isEmpty()) {
            log.warn("Ungültiges Auto empfangen: {}", errors);
        }

        return errors;
    }

    // ---------------------------------------------------------
    // Hilfsmethoden (müssen innerhalb der Klasse stehen!)
    // ---------------------------------------------------------

    private void validateString(String value, String fieldName, List<String> errors) {
        if (value == null || value.isBlank()) {
            errors.add(fieldName + " darf nicht leer sein");
        }
    }

    private void validateMin(int value, int min, String fieldName, List<String> errors) {
        if (value < min) {
            errors.add(fieldName + " muss >= " + min + " sein");
        }
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is empty");
        }

        if (file.getOriginalFilename() == null) {
            throw new IllegalArgumentException("File must have a name");
        }

        // Max 2 MB
        long maxSize = 2 * 1024 * 1024; // 2 MB
        if (file.getSize() > maxSize) {
            throw new IllegalArgumentException("File size exceeds 2 MB limit");
        }

        // Allowed content types
        List<String> allowedTypes = List.of(
                "application/pdf",
                "image/jpeg",
                "image/png"
        );

        if (!allowedTypes.contains(file.getContentType())) {
            throw new IllegalArgumentException(
                    "Unsupported file type: " + file.getContentType()
                            + ". Allowed types: PDF, JPG, PNG"
            );
        }
    }

}
