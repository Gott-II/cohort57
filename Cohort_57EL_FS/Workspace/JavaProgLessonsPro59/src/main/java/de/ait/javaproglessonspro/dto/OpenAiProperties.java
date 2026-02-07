package de.ait.javaproglessonspro.dto;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "openai")
public class OpenAiProperties {
    private String apiKey;
    private String apiUrl;   // <-- wichtig: Name muss zu application.properties passen
    private String model;
    private int timeoutConnect;
    private int timeoutRead;
}
//setx OPENAI_API_KEY "dein_api_key"(in Powerschell)
