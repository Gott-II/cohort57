package de.ait.javaproglessonspro.controllers;


import de.ait.javaproglessonspro.dto.TestDriveConfirmationEmailRequest;
import de.ait.javaproglessonspro.dto.TestDriveReminderEmailRequest;
import de.ait.javaproglessonspro.service.TestDriveEmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email/test-drive")
@RequiredArgsConstructor
public class TestDriveEmailController {

    private static final Logger log = LoggerFactory.getLogger(TestDriveEmailController.class);

    private final TestDriveEmailService testDriveEmailService;

    @PostMapping("/confirmation")
    public ResponseEntity<Void> sendConfirmation(@Valid @RequestBody TestDriveConfirmationEmailRequest request) {
        log.info("Получен запрос на подтверждение тест-драйва: email={}, carId={}",
                request.getClientEmail(), request.getCarId());

        testDriveEmailService.sendConfirmationEmail(request);

        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PostMapping("/reminder")
    public ResponseEntity<Void> sendReminder(@Valid @RequestBody TestDriveReminderEmailRequest request) {
        log.info("Получен запрос на напоминание о тест-драйве: email={}, carId={}",
                request.getClientEmail(), request.getCarId());

        testDriveEmailService.sendReminderEmail(request);

        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}

