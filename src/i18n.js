import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        },
        resources: {
            ru: {
                translation: {
                    "menu-item.tea": "Чай",
                    "menu-item.extras": "Утварь",
                    "menu-item.about": "О нас",
                    "menu-item.blog": "Блог",
                    "menu-item.contacts": "Контакты"
                }
            },
            en: {
                translation: {
                    "menu-item.tea": "Tea",
                    "menu-item.extras": "Extras",
                    "menu-item.about": "About",
                    "menu-item.blog": "Blog",
                    "menu-item.contacts": "Contacts"
                }
            }
        }
        });

export default i18n;