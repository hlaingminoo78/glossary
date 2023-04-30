import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18next
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    // lng: "en",
    fallbackLng: "en",
    nonExplicitSupportLngs: true,
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18next;
