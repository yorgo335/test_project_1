// common functions used in at least 2 or even all pages


//checks the saved theme on the localStorage if its dark then set dark by using my custom attribute data-theme else keep it default (:root)
export function checkSavedTheme() { 

    const toggleDarkLightBtn = document.getElementById("toggleDarkLightBtn");
	const imgTag = document.getElementById("DarkLightImg")
    
	if(localStorage.getItem("theme") == "dark"){
		document.documentElement.setAttribute('data-theme', 'dark');
		imgTag.src = "assets/light-mode.png";
	}else{
		imgTag.src = "assets/dark-mode.png";
	}

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
