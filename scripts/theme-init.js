//Okay so i noticed loading the theme in the DOMContentLoaded in body cause it so that
//If i use dark theme then when opened a new page it will flash for a second the light mode theme then go back to dark
//yes it is a minor things but I found it really bad so I decided to run this code in the <head> which means before ANY CONTENT IS LOADED

//anyway code explanation

// checks the saved theme on the localStorage 
// if its dark then set dark by using my custom attribute data-theme 
// else keep it default (:root) or in other words light mode

// I did consider going for data-theme="light" but I thought using :root might just be better
// yes it does mean I do .removeAttribute('data-theme') to go light mode but for now this works fine

const imgTag = document.getElementById("DarkLightImg")
    
if(localStorage.getItem("theme") == "dark"){

	document.documentElement.setAttribute('data-theme', 'dark');
	imgTag.src = "assets/light-mode.png";

}else{

	document.documentElement.setAttribute('data-theme', 'light');
	imgTag.src = "assets/dark-mode.png";
	
}