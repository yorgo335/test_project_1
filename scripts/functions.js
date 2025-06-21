// common functions used in at least 2 or even all pages

export function setupThemeToggle() { 

	const imgTag = document.getElementById("DarkLightImg");

    const toggleDarkLightBtn = document.getElementById("toggleDarkLightBtn");
	toggleDarkLightBtn.onclick = toggleDarkLight;

	if(document.documentElement.getAttribute('data-theme') == "dark"){

		imgTag.src = "assets/light-mode.png";
	
	}else{

		imgTag.src = "assets/dark-mode.png";
	
	}

}

function toggleDarkLight() { 

	const currentTheme= document.documentElement.getAttribute('data-theme');
	const imgTag = document.getElementById("DarkLightImg");

	if(currentTheme == "dark"){
		
		document.documentElement.setAttribute('data-theme', 'light');
		imgTag.src = "assets/dark-mode.png";
		localStorage.setItem("theme", "light");


		//for some reason on MOBILE ONLY, changing dark/light mode looked MESSED UP
		//I needed to tilt the phone horizontal then vertical or zoom in then zoom out for the whole page color to change
		//else it would only cover part of the page with elements
		//this fix I found on google, originally it was to use "none" but this reseted the scroll position
		//I didn't like it, so I tried flex and it worked as I wanted it
		document.documentElement.style.display = "flex";
		requestAnimationFrame(() => {
		document.documentElement.style.display = "";
		});

	}else{

		document.documentElement.setAttribute('data-theme', 'dark');
		imgTag.src = "assets/light-mode.png";
		localStorage.setItem("theme", "dark");

		document.documentElement.style.display = "flex";
		requestAnimationFrame(() => {
		document.documentElement.style.display = "";
		});

	}

}

var id = null;
export function fadeIn(){
	
	var elem = document.documentElement;
	var pos = 40;
	
	elem.style.filter = `brightness(30%)`;

	clearInterval(id);
	id= setInterval(frame, 16);

	function frame(){

		if(pos < 100){

			pos += 5;
			elem.style.filter = `brightness(${pos}%)`;
		
		}else{

			clearInterval(id);
		
		}
	}
}