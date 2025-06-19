// iteminfo page require a diff DOMContentLoaded, and instead on relying on if else or using onload="" in html i decided to opt for
// a diff js file for it, oh and functions only used here will be placed here

import { setupThemeToggle } from './functions.js';

document.addEventListener('DOMContentLoaded', () => {

    setupThemeToggle(); //load the theme light by default or dark if user previously used it

    //I opted for the sending product info through the URL by using ?name=.... so that i can have 1 html file who I dynamically
    //load the product info.
    //First I will use URLSearchParams on window.location.search to get the parameters and afterwards I will .get('') every parameter
    //and save them so they can be used later
    const params = new URLSearchParams(window.location.search);
	const name = params.get('name');
	const imagepath = params.get('imagepath');
	const price = params.get('price');
	const description = params.get('description');
	const tag = document.getElementById("iteminfocontent");

    document.title = name; //this changes the title of the document aka the title of the page

    
    //this is the html to display the product info, it will be put inside the div with id iteminfocontent
    //basically I opted for the image on left with info on right and order button at bottom. 
    tag.innerHTML = `<img src="${imagepath}" alt="${name}" title="${name}">
					 <div id="itemdescription">
					 <p><strong>Name: </strong>${name}<br><strong>Price: </strong>$${price}<br></p>
					 <span><strong>About the item:</strong><br></span>
					 <ul>${description.split('\n').map(line => `<li>${line.trim()}</li>`).join('')}</ul>
					 </div>`;


    //I had found out that using onclick="" in html is BAD practice so I moved all button.onclick to their respect JS file                 
	const orderNowBtn = document.getElementById("orderNowBtn");
	orderNowBtn.onclick = orderPopup;
	const closePopupBtn = document.getElementById("closePopupBtn");
	closePopupBtn.onclick = closePopup;
});


function orderPopup(){

	if(confirm("Are you sure you wanna place your order?")){

		const tag = document.getElementById('OrderPlacedPopup');
		tag.style.display = "flex";

	}

    //it doesn't make sense to add an else since if you don't want to then okay don't order

}

function closePopup(){

	const tag = document.getElementById('OrderPlacedPopup');
	tag.style.display = "none";

}