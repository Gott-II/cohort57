module de.ait.demojavafxapp {
    requires javafx.controls;
    requires javafx.fxml;

    requires com.fasterxml.jackson.databind;
    requires com.fasterxml.jackson.core;
    requires com.fasterxml.jackson.annotation;
    requires java.sql;

    // Für FXML
    opens de.ait.demojavafxapp to javafx.fxml;
    opens de.ait.demojavafxapp.controller to javafx.fxml;

    // Für Jackson (Reflection!)
    opens de.ait.demojavafxapp.model to com.fasterxml.jackson.databind;

    exports de.ait.demojavafxapp;
    exports de.ait.demojavafxapp.controller;
}
