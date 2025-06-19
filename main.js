// most pages will use this DOMContentLoaded

import { checkSavedTheme } from './functions.js';

document.addEventListener('DOMContentLoaded', () => {

	checkSavedTheme(); //load the theme light by default or dark if user previously used it

});