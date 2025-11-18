import { createContext } from 'react';

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  // das ist ein Kommentar für die Änderung
  // des Themas in der Anwendung
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
// Ein weiterer Kommentar zur Erklärung des Codes oben 
// und seiner Funktionalität in der Anwendung.
//ThemeContext wird verwendet, um das aktuelle Thema zu verwalten. und Undefined ist der Standardwert.solange kein Wert bereitgestellt wird.durch einen Context Provider.
export default ThemeContext;
