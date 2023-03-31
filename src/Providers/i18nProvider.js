// in src/i18nProvider.js
import polyglotI18nProvider from "ra-i18n-polyglot";
import { es } from "./translations/es";
import { en } from "./translations/en";

const translations = { en, es };

export const i18nProvider = polyglotI18nProvider(
  (locale) => translations[locale],
  "es", // default locale
  [
    { locale: "en", name: "English" },
    { locale: "es", name: "Español" },
  ]
);
