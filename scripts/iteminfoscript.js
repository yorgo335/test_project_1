// iteminfo page require a diff DOMContentLoaded, and instead on relying on if else or using onload="" in html i decided to opt for
// a diff js file for it, oh and functions only used here will be placed here

import { fadeIn, setupThemeToggle } from './functions.js';

document.addEventListener('DOMContentLoaded', () => {

    setupThemeToggle(); //load the theme light by default or dark if user previously used it

	fadeIn();

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

	const confirmOrderPopupBtn = document.getElementById("confirmOrderPopupBtn");
	confirmOrderPopupBtn.onclick = confirmOrderPopup;

	const cancelOrderPopupBtn = document.getElementById("cancelOrderPopupBtn");
	cancelOrderPopupBtn.onclick = cancelOrderPopup;

	const closeOrderPopupBtn = document.getElementById("closeOrderPopupBtn");
	closeOrderPopupBtn.onclick = closeOrderPopup;
	
});

//the next 2 functions will take care of confirm/canceling an order
function confirmOrderPopup(){

	const confirmTag = document.getElementById("confirmOrderPopup");
	confirmTag.style.display = "none";

	const orderTag = document.getElementById("OrderPlacedPopup");
	orderTag.style.display = "flex";

	fadeInOrderPlacedPopup();

}

function cancelOrderPopup(){

	const tag = document.getElementById("confirmOrderPopup");
	tag.style.display = "none";

	unblurAll();

}

function orderPopup(){

	const tag = document.getElementById("confirmOrderPopup");
	//tag.style.display = "flex"; //moved it to the animation function to avoid flash of the element before animation
	blurAllButPopup();

	movePopupTopToCenter();
	

}

function closeOrderPopup(){

	const tag = document.getElementById('OrderPlacedPopup');
	tag.style.display = "none";

	unblurAll();

}

var id = null;

function movePopupTopToCenter(){

	var elem = document.getElementById("confirmOrderPopup");
	var pos = -200;

	elem.style.top = `${pos}px`;
	elem.style.display = "flex";

	var target = window.innerHeight/2;

	clearInterval(id);
	id = setInterval(frame, 8);

	function frame(){

		if(pos < target){

			pos+= 10;
			elem.style.top = `${pos}px`;

		}else{

			clearInterval(id);
		
		}
	}
}

function fadeInOrderPlacedPopup(){
	
	var elem = document.getElementById("OrderPlacedPopup");
	var pos = 10;
	
	elem.style.filter = `brightness(0%)`;

	clearInterval(id);
	id= setInterval(frame, 16);

	function frame(){

		if(pos < 100){

			pos+=5;
			elem.style.filter = `brightness(${pos}%)`;

		}else{
			
			clearInterval(id);
		}
	}
}


function blurAllButPopup(){

	const confirmTag = document.getElementById("confirmOrderPopup");
	const orderTag = document.getElementById("OrderPlacedPopup");

	document.body.style.overflow = "hidden"; // prevent the shift and scrollbar appearing for no reason ??

	for(let elem of document.body.children){ // of gives me the element while in gives me index and name and so on

		if(elem != confirmTag && elem != orderTag){

			elem.style.filter = `blur(8px)`; //blurs everything that isn't the popup
			elem.style.pointerEvents = "none"; //makes it so you cannot interact with anything but the popup
		
		}
		
	}

}

function unblurAll(){ //clears all changes made in blurall function

	document.body.style.overflow = "";

	for(let elem of document.body.children){ // of gives me the element while in gives me index and name and so on

		elem.style.filter = "";
		elem.style.pointerEvents = "";
		
	}

}