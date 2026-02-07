package de.ait.demojavafxapp.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.*;
import java.util.Properties;

public class SettingsService {

    private static final Path CONFIG_PATH =
            Path.of(System.getProperty("user.home"), ".taskmanager", "config.properties");

    private static final String DEFAULT_LANGUAGE = "de";
    private static final String DEFAULT_THEME = "light";

    private final Properties props = new Properties();

    public SettingsService() {
        load();
    }

    // =========================================================
    // LOAD
    // =========================================================
    public void load() {
        try {
            if (Files.exists(CONFIG_PATH)) {
                try (InputStream in = Files.newInputStream(CONFIG_PATH)) {
                    props.load(in);
                }
            } else {
                // Defaults setzen, wenn Datei nicht existiert
                props.setProperty("language", DEFAULT_LANGUAGE);
                props.setProperty("theme", DEFAULT_THEME);
                save();
            }
        } catch (IOException e) {
            System.err.println("⚠ Fehler beim Laden der Einstellungen: " + e.getMessage());
        }
    }

    // =========================================================
    // SAVE (atomar)
    // =========================================================
    public void save() {
        try {
            Files.createDirectories(CONFIG_PATH.getParent());

            Path tempFile = Files.createTempFile("config", ".tmp");

            try (OutputStream out = Files.newOutputStream(tempFile)) {
                props.store(out, "User settings");
            }

            Files.move(tempFile, CONFIG_PATH, StandardCopyOption.REPLACE_EXISTING);

        } catch (IOException e) {
            System.err.println("⚠ Fehler beim Speichern der Einstellungen: " + e.getMessage());
        }
    }

    // =========================================================
    // LANGUAGE
    // =========================================================
    public String getLanguage() {
        return props.getProperty("language", DEFAULT_LANGUAGE);
    }

    public void setLanguage(String lang) {
        if (!lang.equals("de") && !lang.equals("en")) {
            System.err.println("⚠ Ungültige Sprache: " + lang);
            return;
        }
        props.setProperty("language", lang);
        save();
    }

    // =========================================================
    // THEME
    // =========================================================
    public String getTheme() {
        return props.getProperty("theme", DEFAULT_THEME);
    }

    public void setTheme(String theme) {
        if (!theme.equals("light") && !theme.equals("dark")) {
            System.err.println("⚠ Ungültiges Theme: " + theme);
            return;
        }
        props.setProperty("theme", theme);
        save();
    }
}



