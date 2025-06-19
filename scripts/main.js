// most pages will use this DOMContentLoaded

import { setupThemeToggle } from './functions.js';

document.addEventListener('DOMContentLoaded', () => {

	setupThemeToggle(); //load the theme light by default or dark if user previously used it

});