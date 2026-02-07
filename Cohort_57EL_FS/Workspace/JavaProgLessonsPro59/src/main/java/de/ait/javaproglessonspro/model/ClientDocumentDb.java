package de.ait.javaproglessonspro.model;

import de.ait.javaproglessonspro.enums.ClientDocumentType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "client_documents_db")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientDocumentDb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotBlank
    @Column(name = "client_email", nullable = false)
    private String clientEmail;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "doc_type", nullable = false)
    private ClientDocumentType docType;

    @NotBlank
    @Column(name = "content_type", nullable = false)
    private String contentType;

    @NotNull
    @Column(nullable = false)
    private Long size;

    @NotNull
    @Column(name = "original_file_name", nullable = false)
    private String originalFileName;

    @NotNull
    @Column(name = "file_name", nullable = false)
    private String fileName;   // <-- FEHLTE BISHER


    @NotNull
    @Column(columnDefinition = "VARBINARY(10000)",
            nullable = false)
    private byte[] data;

    public ClientDocumentDb(String clientEmail,
                            ClientDocumentType docType,
                            String contentType,
                            Long size,
                            String originalFileName,
                            String fileName,
                            byte[] data) {
        this.clientEmail = clientEmail;
        this.docType = docType;
        this.contentType = contentType;
        this.size = size;
        this.originalFileName = originalFileName;
        this.fileName = fileName;
        this.data = data;
    }

    @Override
    public String toString() {
        return "ClientDocumentDb{" +
                "id=" + id +
                ", clientEmail='" + clientEmail + '\'' +
                ", docType=" + docType +
                ", contentType='" + contentType + '\'' +
                ", size=" + size +
                ", originalFileName='" + originalFileName + '\'' +
                ", fileName='" + fileName + '\'' +
                '}';
    }
}

