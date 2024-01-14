import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import {en, vi} from "./translations"

const resources = {
    en: {
        translation: en
    },
    vi: {
        translation: vi
    }
}
i18next.use(initReactI18next).init({
    debug: true,
    lng: "vi",
    compatibilityJSON: "v3",
    fallbackLng: "vi",
    interpolation: {
        escapeValue: false
    },
    resources
})

export default i18next;