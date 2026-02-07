package de.ait.javaproglessonspro.controllers;

import de.ait.javaproglessonspro.enums.CarDocumentType;
import de.ait.javaproglessonspro.model.Car;
import de.ait.javaproglessonspro.model.CarDocumentOs;
import de.ait.javaproglessonspro.service.CarDocumentOsService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CarDocumentOsController.class)
class CarDocumentOsControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CarDocumentOsService service;

    private CarDocumentOs mockDoc(Long carId, Long docId) {
        Car car = new Car();
        car.setId(carId);

        CarDocumentOs doc = new CarDocumentOs();
        doc.setId(docId);
        doc.setCar(car);
        doc.setOriginalFileName("brief.pdf");
        doc.setContentType("application/pdf");
        doc.setStoragePath("/path/uuid.pdf");
        doc.setDocType(CarDocumentType.PASSPORT);

        return doc;
    }

    // ---------------------------------------------------------
    // SUCCESS: UPLOAD
    // ---------------------------------------------------------
    @Test
    void uploadDocument_shouldReturnOk() throws Exception {

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "brief.pdf",
                "application/pdf",
                "PDFDATA".getBytes()
        );

        CarDocumentOs saved = mockDoc(10L, 1L);

        Mockito.when(service.uploadDocument(anyLong(), any(), any()))
                .thenReturn(saved);

        mockMvc.perform(multipart("/api/cars/10/documents/PASSPORT")
                        .file(file))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    // ---------------------------------------------------------
    // SUCCESS: DOWNLOAD
    // ---------------------------------------------------------
    @Test
    void downloadDocument_shouldReturnFile() throws Exception {

        CarDocumentOs doc = mockDoc(10L, 1L);

        Mockito.when(service.getDocument(1L)).thenReturn(doc);
        Mockito.when(service.downloadDocument(1L)).thenReturn("PDFDATA".getBytes());

        mockMvc.perform(get("/api/cars/10/documents/1/download"))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Disposition",
                        "attachment; filename=\"brief.pdf\""))
                .andExpect(content().contentType("application/pdf"))
                .andExpect(content().bytes("PDFDATA".getBytes()));
    }

    // ---------------------------------------------------------
    // SUCCESS: LIST DOCUMENTS
    // ---------------------------------------------------------
    @Test
    void listDocuments_shouldReturnList() throws Exception {

        CarDocumentOs doc = mockDoc(10L, 1L);

        Mockito.when(service.getDocumentsForCar(10L))
                .thenReturn(List.of(doc));

        mockMvc.perform(get("/api/cars/10/documents"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L));
    }

    // ---------------------------------------------------------
    // SUCCESS: DELETE
    // ---------------------------------------------------------
    @Test
    void deleteDocument_shouldReturnNoContent() throws Exception {

        CarDocumentOs doc = mockDoc(10L, 1L);

        Mockito.when(service.getDocument(1L)).thenReturn(doc);
        Mockito.doNothing().when(service).deleteDocument(1L);

        mockMvc.perform(delete("/api/cars/10/documents/1"))
                .andExpect(status().isNoContent());
    }

    // ---------------------------------------------------------
    // ERROR: 404 – Document not found
    // ---------------------------------------------------------
    @Test
    void downloadDocument_shouldReturn404_whenNotFound() throws Exception {

        Mockito.when(service.getDocument(99L))
                .thenThrow(new EntityNotFoundException("Document not found"));

        mockMvc.perform(get("/api/cars/10/documents/99/download"))
                .andExpect(status().isNotFound());
    }

    // ---------------------------------------------------------
    // ERROR: 409 – Document already exists
    // ---------------------------------------------------------
    @Test
    void uploadDocument_shouldReturn409_whenConflict() throws Exception {

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "brief.pdf",
                "application/pdf",
                "PDFDATA".getBytes()
        );

            Mockito.when(service.uploadDocument(anyLong(), any(), any()))
                    .thenThrow(new IllegalStateException("Document already exists"));

            mockMvc.perform(multipart("/api/cars/10/documents/PASSPORT")
                            .file(file))
                    .andExpect(status().isConflict());
        }

        // ---------------------------------------------------------
        // ERROR: 400 – Invalid file
        // ---------------------------------------------------------
        @Test
        void uploadDocument_shouldReturn400_whenInvalidFile() throws Exception {

            MockMultipartFile emptyFile = new MockMultipartFile(
                    "file",
                    "empty.pdf",
                    "application/pdf",
                    new byte[0]
            );

            Mockito.when(service.uploadDocument(anyLong(), any(), any()))
                    .thenThrow(new IllegalArgumentException("Uploaded file is empty"));

            mockMvc.perform(multipart("/api/cars/10/documents/PASSPORT")
                            .file(emptyFile))
                    .andExpect(status().isBadRequest());
        }
    }
