package de.ait.javaproglessonspro.service;


import de.ait.javaproglessonspro.dto.TestDriveConfirmationEmailRequest;
import de.ait.javaproglessonspro.dto.TestDriveReminderEmailRequest;
import de.ait.javaproglessonspro.model.Car;
import de.ait.javaproglessonspro.repository.CarRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class TestDriveEmailService {

    private static final Logger log = LoggerFactory.getLogger(TestDriveEmailService.class);

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final CarRepository carRepository;

    public void sendConfirmationEmail(TestDriveConfirmationEmailRequest request) {

        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new IllegalArgumentException("Car not found: " + request.getCarId()));

        Context context = new Context();
        context.setVariable("clientName", request.getClientName());
        context.setVariable("car", car);
        context.setVariable("testDriveDateTime", request.getTestDriveDateTime());
        context.setVariable("dealerAddress", request.getDealerAddress());
        context.setVariable("dealerPhone", request.getDealerPhone());
        context.setVariable("cancelUrl",
                "https://dealer.example.com/test-drive/cancel?carId=" + car.getId());

        String html = templateEngine.process("test-drive-confirmation", context);

        sendHtmlEmail(
                request.getClientEmail(),
                "Подтверждение тест-драйва",
                html
        );

        log.info("Confirmation email sent: email={}, carId={}, datetime={}",
                request.getClientEmail(),
                request.getCarId(),
                request.getTestDriveDateTime());
    }

    public void sendReminderEmail(TestDriveReminderEmailRequest request) {

        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new IllegalArgumentException("Car not found: " + request.getCarId()));

        Context context = new Context();
        context.setVariable("clientName", request.getClientName());
        context.setVariable("car", car);
        context.setVariable("testDriveDateTime", request.getTestDriveDateTime());

        String html = templateEngine.process("test-drive-reminder", context);

        sendHtmlEmail(
                request.getClientEmail(),
                "Напоминание о тест-драйве",
                html
        );

        log.info("Reminder email sent: email={}, carId={}, datetime={}",
                request.getClientEmail(),
                request.getCarId(),
                request.getTestDriveDateTime());
    }

    private void sendHtmlEmail(String to, String subject, String html) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);

            mailSender.send(message);

        } catch (MessagingException e) {
            log.error("Email sending failed: to={}, subject={}, error={}",
                    to, subject, e.getMessage(), e);
            throw new RuntimeException("Unable to send email", e);
        }
    }
}


