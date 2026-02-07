package de.ait.javaproglessonspro.repository;

import de.ait.javaproglessonspro.model.CarDocumentOs;
import de.ait.javaproglessonspro.enums.CarDocumentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarDocumentOsRepository extends JpaRepository<CarDocumentOs, Long> {

    // Alle Dokumente eines Autos
    List<CarDocumentOs> findByCarId(Long carId);

    // Dokument eines bestimmten Typs (z. B. TÜV, Versicherung, Foto)
    Optional<CarDocumentOs> findByCarIdAndDocType(Long carId, CarDocumentType docType);

    // Prüfen, ob Dokument existiert
    boolean existsByCarIdAndDocType(Long carId, CarDocumentType docType);
}

