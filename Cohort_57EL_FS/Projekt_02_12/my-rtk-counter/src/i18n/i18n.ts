// src/i18n/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";
import ru from "./locales/ru/translation.json";

i18n
  .use(LanguageDetector) // erkennt automatisch Browser-Sprache
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      ru: { translation: ru },
    },
    fallbackLng: "en", // falls Sprache nicht unterstützt wird
    interpolation: { escapeValue: false },
    detection: {
      // Optionen für LanguageDetector
      order: ["navigator", "localStorage", "htmlTag"],
      caches: ["localStorage"], // merkt sich die gewählte Sprache
    },
  });

export default i18n;
