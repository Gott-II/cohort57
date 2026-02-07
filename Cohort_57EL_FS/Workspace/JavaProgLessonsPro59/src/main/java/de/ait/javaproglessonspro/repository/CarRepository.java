package de.ait.javaproglessonspro.repository;


import de.ait.javaproglessonspro.enums.CarStatus;
import de.ait.javaproglessonspro.enums.FuelType;
import de.ait.javaproglessonspro.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CarRepository extends JpaRepository<Car, Long>, CarSearchRepository {


    // Suche nach Marke (case-insensitive)
    List<Car> findByBrandIgnoreCase(String brand);

    // Suche nach Modell
    List<Car> findByModelIgnoreCase(String model);

    // Suche nach Marke + Modell
    List<Car> findByBrandIgnoreCaseAndModelIgnoreCase(String brand, String model);

    // Suche nach Status (AVAILABLE, SOLD, RESERVED)
    List<Car> findByStatus(CarStatus status);

    // Suche nach Preisbereich
    List<Car> findByPriceBetween(int min, int max);

    // Suche nach Baujahr
    List<Car> findByProductionYear(int year);

    // Suche nach Baujahr >=
    List<Car> findByProductionYearGreaterThanEqual(int year);

    // Suche nach Laufleistung <=
    List<Car> findByMileageLessThanEqual(int mileage);

    List<Car> findByColorIgnoreCase(String color);

    List<Car> findByFuelType(FuelType fuelType);

    List<Car> findByHorsepowerBetween(int minHp, int maxHp);

}


