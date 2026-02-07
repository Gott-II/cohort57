package de.ait.unittests;

import de.alt.unittests.Calculator;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculatorTest {

    private Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
        System.out.println("setUp");
    }

    @Test
    @DisplayName("Должен сложить два положительных числа")
    void testAddShouldAddTwoNumbers() {
        int result = calculator.add(5, 10);
        assertEquals(15, result);
    }

    @Test
    @DisplayName("Должен сложить два нуля")
    void testAddShouldAddTwo0Numbers() {
        int result = calculator.add(0, 0);
        assertEquals(0, result);
    }
}


