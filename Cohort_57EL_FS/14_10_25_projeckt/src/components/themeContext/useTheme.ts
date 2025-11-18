import ThemeContext from './ThemeContext';
import type { ThemeContextType } from './ThemeContext';
import React from 'react';

//useTheme ist ein benutzerdefinierter Hook, der den ThemeContext verwendet, um auf das aktuelle Thema und die Umschaltfunktion zuzugreifen.
// Es gibt das Kontextobjekt zurück, das entweder vom Typ ThemeContextType ist oder undefined, wenn der Kontext nicht verfügbar ist.
// Dieser Hook vereinfacht den Zugriff auf den ThemeContext in funktionalen Komponenten.

export function useTheme(): ThemeContextType {
  // Verwendung des React useContext-Hooks, um auf den ThemeContext zuzugreifen.
  // Der zurückgegebene Wert ist entweder das Kontextobjekt oder undefined.
  // Wenn der Kontext nicht verfügbar ist, wird ein Fehler ausgelöst.
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  } // Wenn der Kontext nicht verfügbar ist, wird ein Fehler ausgelöst, um sicherzustellen, dass der Hook nur innerhalb eines ThemeProvider verwendet wird.
  return context;
}
// Der Hook gibt das Kontextobjekt zurück, das das aktuelle Thema und die Umschaltfunktion enthält.

// Dies ermöglicht es Komponenten, das Thema zu lesen und zu ändern, ohne direkt mit dem Kontext arbeiten zu müssen.
// Es fördert die Wiederverwendbarkeit und Lesbarkeit des Codes.
// Der Hook stellt sicher, dass der Kontext nur innerhalb eines ThemeProvider verwendet wird, um Fehler zu vermeiden.
// Dadurch wird die Konsistenz und Integrität des Themas in der gesamten Anwendung gewährleistet.
// Insgesamt verbessert dieser benutzerdefinierte Hook die Handhabung des Themas in React-Anwendungen erheblich.
// Er vereinfacht den Zugriff auf den ThemeContext und stellt sicher, dass er korrekt verwendet wird.
// Er trägt zur besseren Strukturierung und Wartbarkeit des Codes bei.
// Er ermöglicht es Entwicklern, sich auf die Logik ihrer Komponenten zu konzentrieren, ohne sich um die Details der Kontextverwaltung kümmern zu müssen.
// Der Hook ist ein wichtiger Bestandteil der themenbezogenen Funktionalität in React-Anwendungen.
