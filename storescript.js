// special script for store, it is mostly just for loading the products from json file, if working with databse i would be relying on sql

import { checkSavedTheme } from './functions.js';

document.addEventListener('DOMContentLoaded', () => {

    checkSavedTheme(); //load the theme light by default or dark if user previously used it

    const tag = document.getElementById("browseProducts");

    //currently I am using a json file so i fetch it and parse this JSON data into an array of objects usable here where
    //each object represents 1 product that contains its name, price, imagepath and description.
    //I will then append to the browseProducts div the needed html to display the product in the right format 
    fetch('items.json')
  	.then(response => response.json())
  	.then(items => {

		for(let i=0; i<items.length; i++){

			tag.innerHTML += `<div class="product">
            	<a href="iteminfo.html?name=${encodeURIComponent(items[i].name)}&imagepath=${items[i].imagepath}&price=${items[i].price}&description=${encodeURIComponent(items[i].description)}"><img src="${items[i].imagepath}" title="${items[i].name}" alt="${items[i].name}"></a>
            	<p><strong>Name:</strong> ${items[i].name}<br><strong>Price:</strong> \$${items[i].price}</p>
        	</div>`

		}
        
  	})

});