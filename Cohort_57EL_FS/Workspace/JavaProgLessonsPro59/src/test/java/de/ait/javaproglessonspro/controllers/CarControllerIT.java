package de.ait.javaproglessonspro.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.ait.javaproglessonspro.enums.CarStatus;
import de.ait.javaproglessonspro.enums.FuelType;
import de.ait.javaproglessonspro.enums.Transmission;
import de.ait.javaproglessonspro.model.Car;
import de.ait.javaproglessonspro.repository.CarRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DisplayNameGeneration(ReplaceUnderscores.class)
class CarControllerIT {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    CarRepository carRepository;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        carRepository.deleteAll();
    }

    private Car createTestCar() {
        return new Car(
                "BMW",
                "X5",
                2020,
                15000,
                45000,
                CarStatus.AVAILABLE,
                "Black",
                250,
                FuelType.PETROL,
                Transmission.AUTOMATIC
        );
    }

    // ---------------------------------------------------------
    // POST Tests
    // ---------------------------------------------------------
    @Nested
    class POST_Endpoints {

        @Test
        void sollte_ein_neues_Auto_hinzufügen() throws Exception {
            Car car = createTestCar();

            mockMvc.perform(post("/api/cars")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(car)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.brand").value("BMW"))
                    .andExpect(jsonPath("$.model").value("X5"));

            assertEquals(1, carRepository.count());
        }

        @Test
        void sollte_BadRequest_zurückgeben_wenn_JSON_ungültig_ist() throws Exception {
            String invalidJson = "{ \"brand\": \"BMW\", \"price\": \"NOT_A_NUMBER\" }";

            mockMvc.perform(post("/api/cars")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(invalidJson))
                    .andExpect(status().isBadRequest());
        }
    }

    // ---------------------------------------------------------
    // GET Tests
    // ---------------------------------------------------------
    @Nested
    class GET_Endpoints {

        @Test
        void sollte_alle_Autos_zurückgeben() throws Exception {
            carRepository.save(createTestCar());

            mockMvc.perform(get("/api/cars"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()", is(1)));
        }

        @Test
        void sollte_Auto_nach_ID_finden() throws Exception {
            Car saved = carRepository.save(createTestCar());

            mockMvc.perform(get("/api/cars/" + saved.getId()))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.brand").value("BMW"));
        }

        @Test
        void sollte_Autos_nach_Farbe_filtern() throws Exception {
            Car car = createTestCar();
            car.setColor("Red");
            carRepository.save(car);

            mockMvc.perform(get("/api/cars/by-color?color=red"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()", is(1)));
        }

        @Test
        void sollte_Autos_nach_Kraftstoff_filtern() throws Exception {
            Car car = createTestCar();
            car.setFuelType(FuelType.DIESEL);
            carRepository.save(car);

            mockMvc.perform(get("/api/cars/by-fuel?fuelType=DIESEL"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()", is(1)));
        }

        @Test
        void sollte_Autos_nach_Leistung_filtern() throws Exception {
            Car car = createTestCar();
            car.setHorsepower(200);
            carRepository.save(car);

            mockMvc.perform(get("/api/cars/by-power?minHp=150&maxHp=250"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()", is(1)));
        }
    }

    // ---------------------------------------------------------
    // PUT Tests
    // ---------------------------------------------------------
    @Nested
    class PUT_Endpoints {

        @Test
        void sollte_Auto_aktualisieren() throws Exception {
            Car saved = carRepository.save(createTestCar());
            saved.setPrice(9999);

            mockMvc.perform(put("/api/cars/" + saved.getId())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(saved)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.price").value(9999));
        }
    }

    // ---------------------------------------------------------
    // DELETE Tests
    // ---------------------------------------------------------
    @Nested
    class DELETE_Endpoints {

        @Test
        void sollte_Auto_löschen() throws Exception {
            Car saved = carRepository.save(createTestCar());

            mockMvc.perform(delete("/api/cars/" + saved.getId()))
                    .andExpect(status().isNoContent());

            assertEquals(0, carRepository.count());
        }
    }

    // ---------------------------------------------------------
    // NEGATIVE TESTS
    // ---------------------------------------------------------
    @Nested
    class Negative_Tests {

        @Test
        void sollte_404_zurückgeben_wenn_Auto_nicht_existiert() throws Exception {
            mockMvc.perform(get("/api/cars/99999"))
                    .andExpect(status().isNotFound());
        }

        @Test
        void sollte_400_zurückgeben_wenn_Preisbereich_ungültig_ist() throws Exception {
            mockMvc.perform(get("/api/cars/by-price?min=50000&max=10000"))
                    .andExpect(status().isBadRequest());
        }

        @Test
        void sollte_400_zurückgeben_wenn_Leistungsbereich_ungültig_ist() throws Exception {
            mockMvc.perform(get("/api/cars/by-power?minHp=300&maxHp=100"))
                    .andExpect(status().isBadRequest());
        }

        @Test
        void sollte_400_zurückgeben_wenn_FuelType_ungültig_ist() throws Exception {
            mockMvc.perform(get("/api/cars/by-fuel?fuelType=INVALID_FUEL"))
                    .andExpect(status().isBadRequest());
        }

        @Test
        void sollte_400_zurückgeben_wenn_Status_ungültig_ist() throws Exception {
            mockMvc.perform(get("/api/cars/search?status=NOT_A_STATUS"))
                    .andExpect(status().isBadRequest());
        }

        @Test
        void sollte_400_zurückgeben_wenn_JSON_ungültig_ist() throws Exception {
            String invalidJson = "{ \"brand\": \"BMW\", \"price\": \"NOT_A_NUMBER\" }";

            mockMvc.perform(post("/api/cars")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(invalidJson))
                    .andExpect(status().isBadRequest());
        }

        @Test
        void ungültiger_POST_sollte_Fehler_JSON_zurückgeben() throws Exception {

            String invalidJson = """
            {
              "brand": "",
              "model": "",
              "productionYear": 1500,
              "mileage": -10,
              "price": -100,
              "status": null,
              "color": "",
              "horsepower": 0,
              "fuelType": null,
              "transmission": null
            }
            """;

            mockMvc.perform(post("/api/cars")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(invalidJson))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.errors", hasSize(10)))
                    .andExpect(jsonPath("$.errors", hasItem("Marke darf nicht leer sein")))
                    .andExpect(jsonPath("$.errors", hasItem("Modell darf nicht leer sein")))
                    .andExpect(jsonPath("$.errors", hasItem("Baujahr muss >= 1900 sein")))
                    .andExpect(jsonPath("$.errors", hasItem("Kilometerstand muss >= 0 sein")))
                    .andExpect(jsonPath("$.errors", hasItem("Preis muss >= 1 sein")))
                    .andExpect(jsonPath("$.errors", hasItem("Status darf nicht null sein")))
                    .andExpect(jsonPath("$.errors", hasItem("Farbe darf nicht leer sein")))
                    .andExpect(jsonPath("$.errors", hasItem("PS muss >= 1 sein")))
                    .andExpect(jsonPath("$.errors", hasItem("Kraftstofftyp darf nicht null sein")))
                    .andExpect(jsonPath("$.errors", hasItem("Getriebe darf nicht null sein")));

            assertEquals(0, carRepository.count());
        }
    }
}






