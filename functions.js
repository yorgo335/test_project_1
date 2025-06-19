// common functions used in at least 2 or even all pages

export function setupThemeToggle() { 

    const toggleDarkLightBtn = document.getElementById("toggleDarkLightBtn");
	toggleDarkLightBtn.onclick = toggleDarkLight;

}

function toggleDarkLight() { 

	const currentTheme= document.documentElement.getAttribute('data-theme');
	const imgTag = document.getElementById("DarkLightImg");

	if(currentTheme == "dark"){
		
		document.documentElement.removeAttribute('data-theme');
		imgTag.src = "assets/dark-mode.png";
		localStorage.setItem("theme", "light");

	}else{

		document.documentElement.setAttribute('data-theme', 'dark');
		imgTag.src = "assets/light-mode.png";
		localStorage.setItem("theme", "dark");

	}

}
