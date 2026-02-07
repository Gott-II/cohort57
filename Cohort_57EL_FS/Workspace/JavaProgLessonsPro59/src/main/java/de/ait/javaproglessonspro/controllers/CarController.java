package de.ait.javaproglessonspro.controllers;

import de.ait.javaproglessonspro.enums.CarStatus;
import de.ait.javaproglessonspro.enums.FuelType;
import de.ait.javaproglessonspro.model.Car;
import de.ait.javaproglessonspro.service.CarService;
import de.ait.javaproglessonspro.validation.CarValidator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@Tag(name = "Car Management", description = "Verwaltung und Suche von Autos")
@Slf4j
public class CarController {

    private final CarService carService;
    private final CarValidator carValidator;

    // ---------------------------------------------------------
    // BASIC CRUD
    // ---------------------------------------------------------

    @GetMapping
    @Operation(summary = "Alle Autos abrufen")
    public List<Car> getAllCars() {
        return carService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Auto nach ID abrufen")
    public Car getCarById(@PathVariable Long id) {
        return carService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Neues Auto hinzufügen")
    public ResponseEntity<?> addCar(@RequestBody Car car) {

        List<String> errors = carValidator.validateWithErrors(car);

        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("errors", errors));
        }

        return ResponseEntity.status(201).body(carService.save(car));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Auto aktualisieren")
    public Car updateCar(@PathVariable Long id, @Valid @RequestBody Car car) {
        return carService.update(id, car);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Auto löschen")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        carService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ---------------------------------------------------------
    // SEARCH ENDPOINTS (für Tests erforderlich!)
    // ---------------------------------------------------------

    @GetMapping("/search")
    @Operation(summary = "Autos anhand verschiedener Kriterien suchen")
    public List<Car> searchCars(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) CarStatus status,
            @RequestParam(required = false) Integer minYear,
            @RequestParam(required = false) Integer maxMileage,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) Integer minHorsepower,
            @RequestParam(required = false) Integer maxHorsepower,
            @RequestParam(required = false) String fuelType
    ) {
        return carService.searchCars(
                brand,
                minPrice,
                maxPrice,
                status,
                minYear,
                maxMileage,
                color,
                minHorsepower,
                maxHorsepower,
                fuelType
        );
    }

    // ---------------------------------------------------------
    // INDIVIDUELLE FILTER-ENDPOINTS (Tests erwarten diese!)
    // ---------------------------------------------------------

    @GetMapping("/by-color")
    public List<Car> getByColor(@RequestParam String color) {
        return carService.searchCars(
                null, null, null, null, null, null,
                color,
                null, null,
                null
        );
    }

    @GetMapping("/by-fuel")
    public List<Car> getByFuel(@RequestParam FuelType fuelType) {
        return carService.searchCars(
                null, null, null, null, null, null,
                null,
                null, null,
                fuelType.name()
        );
    }

    @GetMapping("/by-power")
    public ResponseEntity<?> getByPower(
            @RequestParam Integer minHp,
            @RequestParam Integer maxHp
    ) {
        if (minHp > maxHp) {
            return ResponseEntity.badRequest().body("Ungültiger Leistungsbereich");
        }

        return ResponseEntity.ok(
                carService.searchCars(
                        null, null, null, null, null, null,
                        null,
                        minHp,
                        maxHp,
                        null
                )
        );
    }

    @GetMapping("/by-price")
    public ResponseEntity<?> getByPrice(
            @RequestParam Integer min,
            @RequestParam Integer max
    ) {
        if (min > max) {
            return ResponseEntity.badRequest().body("Ungültiger Preisbereich");
        }

        return ResponseEntity.ok(
                carService.searchCars(
                        null,
                        min,
                        max,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null
                )
        );
    }
}
