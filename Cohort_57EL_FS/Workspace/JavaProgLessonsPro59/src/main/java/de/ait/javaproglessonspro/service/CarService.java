package de.ait.javaproglessonspro.service;

import de.ait.javaproglessonspro.enums.CarStatus;

import de.ait.javaproglessonspro.model.Car;

import java.util.List;


public interface CarService {

    List<Car> findAll();

    Car findById(Long id);

    Car save(Car car);

    Car update(Long id, Car car);

    void delete(Long id);

    List<Car> searchCars(
            String brand,
            Integer minPrice,
            Integer maxPrice,
            CarStatus status,
            Integer minYear,
            Integer maxMileage,
            String color,
            Integer minHorsepower,
            Integer maxHorsepower,
            String fuelType
    );

}

