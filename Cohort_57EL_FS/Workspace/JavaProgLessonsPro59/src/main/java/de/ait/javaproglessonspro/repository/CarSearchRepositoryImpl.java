package de.ait.javaproglessonspro.repository;

import de.ait.javaproglessonspro.enums.CarStatus;
import de.ait.javaproglessonspro.model.Car;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CarSearchRepositoryImpl implements CarSearchRepository {

    private final EntityManager em;

    @Override
    public List<Car> search(String brand, Integer minPrice, Integer maxPrice,
                            CarStatus status, Integer minYear, Integer maxMileage) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Car> cq = cb.createQuery(Car.class);
        Root<Car> car = cq.from(Car.class);

        List<Predicate> predicates = new ArrayList<>();

        if (brand != null) {
            predicates.add(cb.equal(cb.lower(car.get("brand")), brand.toLowerCase()));
        }
        if (minPrice != null) {
            predicates.add(cb.greaterThanOrEqualTo(car.get("price"), minPrice));
        }
        if (maxPrice != null) {
            predicates.add(cb.lessThanOrEqualTo(car.get("price"), maxPrice));
        }
        if (status != null) {
            predicates.add(cb.equal(car.get("status"), status));
        }
        if (minYear != null) {
            predicates.add(cb.greaterThanOrEqualTo(car.get("productionYear"), minYear));
        }
        if (maxMileage != null) {
            predicates.add(cb.lessThanOrEqualTo(car.get("mileage"), maxMileage));
        }

        cq.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(cq).getResultList();
    }
}

