package de.ait.javaproglessonspro.service;

import de.ait.javaproglessonspro.enums.CarStatus;
import de.ait.javaproglessonspro.model.Car;
import de.ait.javaproglessonspro.repository.CarRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;

    @Override
    public List<Car> findAll() {
        log.info("Fetching all cars");
        return carRepository.findAll();
    }

    @Override
    public Car findById(Long id) {
        log.info("Fetching car with ID {}", id);
        return carRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Car not found: " + id));
    }

    @Override
    public Car save(Car car) {
        log.info("Saving new car: {} {}", car.getBrand(), car.getModel());
        return carRepository.save(car);
    }

    @Override
    public Car update(Long id, Car car) {
        log.info("Updating car with ID {}", id);

        Car existing = findById(id);

        existing.setBrand(car.getBrand());
        existing.setModel(car.getModel());
        existing.setProductionYear(car.getProductionYear());
        existing.setMileage(car.getMileage());
        existing.setPrice(car.getPrice());
        existing.setStatus(car.getStatus());
        existing.setColor(car.getColor());
        existing.setHorsepower(car.getHorsepower());
        existing.setFuelType(car.getFuelType());
        existing.setTransmission(car.getTransmission());

        return carRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        log.info("Deleting car with ID {}", id);

        if (!carRepository.existsById(id)) {
            throw new EntityNotFoundException("Car not found: " + id);
        }

        carRepository.deleteById(id);
    }

    @Override
    public List<Car> searchCars(
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
    ) {
        List<Car> cars = carRepository.findAll();

        return cars.stream()
                .filter(car -> brand == null || car.getBrand().equalsIgnoreCase(brand))
                .filter(car -> minPrice == null || car.getPrice() >= minPrice)
                .filter(car -> maxPrice == null || car.getPrice() <= maxPrice)
                .filter(car -> status == null || car.getStatus() == status)
                .filter(car -> minYear == null || car.getProductionYear() >= minYear)
                .filter(car -> maxMileage == null || car.getMileage() <= maxMileage)
                .filter(car -> color == null || car.getColor().equalsIgnoreCase(color))
                .filter(car -> minHorsepower == null || car.getHorsepower() >= minHorsepower)
                .filter(car -> maxHorsepower == null || car.getHorsepower() <= maxHorsepower)
                .filter(car -> fuelType == null || car.getFuelType().name().equalsIgnoreCase(fuelType))
                .toList();
    }

}


