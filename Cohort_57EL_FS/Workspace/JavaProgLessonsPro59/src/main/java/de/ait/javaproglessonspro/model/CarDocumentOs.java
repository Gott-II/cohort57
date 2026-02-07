package de.ait.javaproglessonspro.model;

import de.ait.javaproglessonspro.enums.CarDocumentType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "car_documents_os")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarDocumentOs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "doc_type", nullable = false)
    private CarDocumentType docType;

    @NotBlank
    @Column(name = "original_filename", nullable = false)
    private String originalFileName;

    @NotBlank
    @Column(name = "stored_filename", nullable = false)
    private String storedFileName;

    @NotBlank
    @Column(name = "content_type", nullable = false)
    private String contentType;

    @NotNull
    @Column(nullable = false)
    private Long size;

    @NotBlank
    @Column(name = "storage_path", nullable = false)
    private String storagePath;

    public CarDocumentOs(Car car,
                         String storagePath,
                         Long size,
                         String contentType,
                         String storedFileName,
                         String originalFileName,
                         CarDocumentType docType) {
        this.car = car;
        this.storagePath = storagePath;
        this.size = size;
        this.contentType = contentType;
        this.storedFileName = storedFileName;
        this.originalFileName = originalFileName;
        this.docType = docType;
    }

    @Override
    public String toString() {
        return "CarDocumentOs{" +
                "id=" + id +
                ", carId=" + (car != null ? car.getId() : null) +
                ", docType=" + docType +
                ", originalFileName='" + originalFileName + '\'' +
                ", storedFileName='" + storedFileName + '\'' +
                ", size=" + size +
                '}';
    }
}

