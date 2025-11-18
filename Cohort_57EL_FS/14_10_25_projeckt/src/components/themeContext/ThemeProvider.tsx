import ThemeContext from "./ThemeContext";
import { useState, type ReactNode , type JSX} from "react";

interface ThemeProviderProps {
    children: ReactNode;
    //ThemeProviderProps definiert die Eigenschaften, die der ThemeProvider-Komponente übergeben werden können.
// In diesem Fall ist es nur children, das die untergeordneten Komponenten darstellt, die innerhalb des Providers gerendert werden.
// Es ist vom Typ ReactNode, was bedeutet, dass es beliebige React-Elemente enthalten kann.
}
export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
    const [theme, setTheme] = useState<string>("light");

    function toggleTheme(): void {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
//ThemeProvider ist eine React-Komponente, die den ThemeContext.Provider verwendet, um das aktuelle Thema und die Funktion zum Umschalten des Themas bereitzustellen.
// Es verwendet den useState-Hook, um den aktuellen Zustand des Themas zu verwalten, der entweder "light" oder "dark" sein kann.
// Die toggleTheme-Funktion ändert den Zustand des Themas, wenn sie aufgerufen wird.
// Schließlich rendert die Komponente die übergebenen Kinder innerhalb des ThemeContext.Provider, sodass alle untergeordneten Komponenten auf das Thema und die Umschaltfunktion zugreifen können.  
// Dies ermöglicht eine zentrale Verwaltung des Themas in der gesamten Anwendung.
//value-Prop des Providers enthält ein Objekt mit dem aktuellen Thema und der Funktion zum Umschalten des Themas.