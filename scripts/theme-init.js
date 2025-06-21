//Okay so i noticed loading the theme in the DOMContentLoaded in body cause it so that
//If i use dark theme then when opened a new page it will flash for a second the light mode theme then go back to dark
//yes it is a minor things but I found it really bad so I decided to run this code in the <head> which means before ANY CONTENT IS LOADED

//anyway code explanation

// checks the saved theme on the localStorage 
// if its dark then set dark by using my custom attribute data-theme 
// else keep it default being light mode
    
if(localStorage.getItem("theme") == "dark"){

	document.documentElement.setAttribute('data-theme', 'dark');

}else{

	document.documentElement.setAttribute('data-theme', 'light');
	
}