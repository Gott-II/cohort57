package de.ait.javaproglessonspro.controllers;

import de.ait.javaproglessonspro.enums.ClientDocumentType;
import de.ait.javaproglessonspro.model.ClientDocumentDb;
import de.ait.javaproglessonspro.service.ClientDocumentDbService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ClientDocumentController.class)
class ClientDocumentControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClientDocumentDbService service;

    // ---------------------------------------------------------
    // SUCCESS: UPLOAD
    // ---------------------------------------------------------
    @Test
    void uploadDocument_shouldReturnCreated() throws Exception {

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "techpass.pdf",
                "application/pdf",
                "PDFDATA".getBytes()
        );

        ClientDocumentDb saved = ClientDocumentDb.builder()
                .id(1L)
                .clientEmail("test@mail.com")
                .docType(ClientDocumentType.TECH_PASSPORT)
                .originalFileName("techpass.pdf")
                .contentType("application/pdf")
                .size(100L)
                .data("PDFDATA".getBytes())
                .build();

        Mockito.when(service.uploadDocument(eq("test@mail.com"), eq(ClientDocumentType.TECH_PASSPORT), any()))
                .thenReturn(saved);

        mockMvc.perform(multipart("/api/clients/documents")
                        .file(file)
                        .param("clientEmail", "test@mail.com")
                        .param("docType", "TECH_PASSPORT"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.docType").value("TECH_PASSPORT"));
    }

    // ---------------------------------------------------------
    // SUCCESS: DOWNLOAD
    // ---------------------------------------------------------
    @Test
    void downloadDocument_shouldReturnFile() throws Exception {

        ClientDocumentDb doc = ClientDocumentDb.builder()
                .id(1L)
                .clientEmail("test@mail.com")
                .docType(ClientDocumentType.PHOTO)
                .originalFileName("photo.png")
                .contentType("image/png")
                .data("IMAGEDATA".getBytes())
                .build();

        Mockito.when(service.getDocument("test@mail.com", ClientDocumentType.PHOTO))
                .thenReturn(doc);

        mockMvc.perform(get("/api/clients/documents")
                        .param("clientEmail", "test@mail.com")
                        .param("docType", "PHOTO"))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Disposition",
                        "attachment; filename=\"photo.png\""))
                .andExpect(content().contentType("image/png"))
                .andExpect(content().bytes("IMAGEDATA".getBytes()));
    }

    // ---------------------------------------------------------
    // SUCCESS: DELETE
    // ---------------------------------------------------------
    @Test
    void deleteDocument_shouldReturnNoContent() throws Exception {

        Mockito.doNothing().when(service).deleteDocument(1L);

        mockMvc.perform(delete("/api/clients/documents/1"))
                .andExpect(status().isNoContent());
    }

    // ---------------------------------------------------------
    // ERROR: 404 – Document not found
    // ---------------------------------------------------------
    @Test
    void downloadDocument_shouldReturn404_whenNotFound() throws Exception {

        Mockito.when(service.getDocument("test@mail.com", ClientDocumentType.CONTRACT))
                .thenThrow(new jakarta.persistence.EntityNotFoundException("Document not found"));

        mockMvc.perform(get("/api/clients/documents")
                        .param("clientEmail", "test@mail.com")
                        .param("docType", "CONTRACT"))
                .andExpect(status().isNotFound());
    }

    // ---------------------------------------------------------
    // ERROR: 409 – Document already exists
    // ---------------------------------------------------------
    @Test
    void uploadDocument_shouldReturn409_whenConflict() throws Exception {

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "contract.pdf",
                "application/pdf",
                "PDFDATA".getBytes()
        );

        Mockito.when(service.uploadDocument(eq("test@mail.com"), eq(ClientDocumentType.CONTRACT), any()))
                .thenThrow(new IllegalStateException("Document already exists"));

        mockMvc.perform(multipart("/api/clients/documents")
                        .file(file)
                        .param("clientEmail", "test@mail.com")
                        .param("docType", "CONTRACT"))
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

        Mockito.when(service.uploadDocument(eq("test@mail.com"), eq(ClientDocumentType.PHOTO), any()))
                .thenThrow(new IllegalArgumentException("File is empty"));

        mockMvc.perform(multipart("/api/clients/documents")
                        .file(emptyFile)
                        .param("clientEmail", "test@mail.com")
                        .param("docType", "PHOTO"))
                .andExpect(status().isBadRequest());
    }
}

