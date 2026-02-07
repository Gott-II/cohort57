package de.ait.javaproglessonspro.repository;

import de.ait.javaproglessonspro.model.ClientDocumentDb;
import de.ait.javaproglessonspro.enums.ClientDocumentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientDocumentDbRepository extends JpaRepository<ClientDocumentDb, Long> {

    // Dokumente eines Clients abrufen
    List<ClientDocumentDb> findByClientEmail(String clientEmail);

    // Dokument eines bestimmten Typs abrufen
    Optional<ClientDocumentDb> findByClientEmailAndDocType(String clientEmail, ClientDocumentType docType);

    // Prüfen, ob ein Dokument existiert
    boolean existsByClientEmailAndDocType(String clientEmail, ClientDocumentType docType);
}

