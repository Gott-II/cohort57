package de.ait.javaproglessonspro.repository;

import de.ait.javaproglessonspro.enums.CarStatus;
import de.ait.javaproglessonspro.model.Car;

import java.util.List;

public interface CarSearchRepository {
    List<Car> search(String brand, Integer minPrice, Integer maxPrice,
                     CarStatus status, Integer minYear, Integer maxMileage);
}

