
import { en, de } from '$lib/i18n/translations.js';

const translations = { en, de };

let locale = $state('de'); // Standard: Deutsch

export const i18n = {

	get locale() {
		return locale;
	},

	setLocale(lang) {
		if (lang in translations) locale = lang;
	},

	t(key) {
		return translations[locale]?.[key] ?? translations.en?.[key] ?? key;
	}
};
