package de.ait.javaproglessonspro.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter

public class TestDriveConfirmationEmailRequest {

    @Email
    @NotBlank(message = "ClientEmail is mandatory")
    private String clientEmail;

    @NotBlank(message = "ClientName is mandatory")
    private String clientName;

    @NotNull(message = "CarId is mandatory")
    private Long carId;

    @NotNull
    private LocalDateTime testDriveDateTime;

    @NotBlank
    private String dealerAddress;

    @NotBlank
    private String dealerPhone;

}
