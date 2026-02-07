package de.ait.demojavafxapp;

import de.ait.demojavafxapp.service.SettingsService;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.Locale;
import java.util.ResourceBundle;

public class Main extends Application {

    private SettingsService settings;

    @Override
    public void start(Stage stage) {

        settings = new SettingsService();

        try {
            Scene scene = loadScene();
            stage.setScene(scene);
            stage.setTitle(getBundle().getString("title"));

            stage.setMinWidth(600);
            stage.setMinHeight(400);

            stage.show();

        } catch (Exception e) {
            System.err.println("❌ Kritischer Fehler beim Starten der Anwendung:");
            e.printStackTrace();
        }
    }

    private Scene loadScene() throws IOException {

        FXMLLoader loader = new FXMLLoader(
                getClass().getResource("/de/ait/demojavafxapp/task-view.fxml"),
                getBundle()
        );

        Scene scene = new Scene(loader.load());

        // Theme laden
        String theme = settings.getTheme();
        String cssPath = "/de/ait/demojavafxapp/css/" + theme + ".css";

        scene.getStylesheets().add(
                getClass().getResource(cssPath).toExternalForm()
        );

        return scene;
    }

    private ResourceBundle getBundle() {
        Locale locale = new Locale(settings.getLanguage());
        return ResourceBundle.getBundle("de.ait.demojavafxapp.i18n.messages", locale);
    }

    public static void main(String[] args) {
        launch();
    }
}


