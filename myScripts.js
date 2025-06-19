/* I did not remove any old codes because they will a 100% help me understand the thought process incase i forget something in the newer codes */

// UPDATE: I have now seperated the JS codes into multiple JS files.



//  !!!!!!!!! IMPORTANT !!!!!!!!!
//
// ignore this file, I only kept this file as it was my first solution for JS part of my site so it would be a waste to remove it
// it will probably be heavily outdated too
//
// !!!!!!!!!! IMPORTANT !!!!!!!!!


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


document.addEventListener('DOMContentLoaded', () => {

	const toggleDarkLightBtn = document.getElementById("toggleDarkLightBtn");
	const imgTag = document.getElementById("DarkLightImg");

	if(localStorage.getItem("theme") == "dark"){

		document.documentElement.setAttribute('data-theme', 'dark');
		imgTag.src = "assets/light-mode.png";

	}else{

		imgTag.src = "assets/dark-mode.png";

	}

	toggleDarkLightBtn.onclick = toggleDarkLight;

});

/*alternatively i could make each body tag have onload="CheckSavedTheme()" and run the function below

function CheckSavedTheme(){
	const imgTag = document.getElementById("DarkLightImg")
	if(localStorage.getItem("theme") == "dark"){
		document.documentElement.setAttribute('data-theme', 'dark');
		imgTag.src = "assets/light-mode.png";
	}else{
		imgTag.src = "assets/dark-mode.png";
	}
}*/


function loadProducts () {
	/*const items = [{name:"Beats Studio Pro", price:199.99, imagepath:"assets/Beats-Studio-Pro.jpg"}, {name:"Sony LinkBuds", price:128.99, imagepath:"assets/Sony-LinkBuds.jpg"}];
	const tag = document.getElementById("browseProducts");

	for(let i=0; i<items.length; i++){
		tag.innerHTML += `<div class="product">
            <img src="${items[i].imagepath}" alt="${items[i].name}">
            <p><strong>Name:</strong> ${items[i].name}<br><strong>Price:</strong> ${items[i].price}USD</p>
        </div>`
	}*/

	const tag = document.getElementById("browseProducts");

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

}

function loadProductInfo(){

	const params = new URLSearchParams(window.location.search);
	const name = params.get('name');
	const imagepath = params.get('imagepath');
	const price = params.get('price');
	const description = params.get('description');

	const tag = document.getElementById("iteminfocontent");

	document.title = name;

	tag.innerHTML = `<img src="${imagepath}" alt="${name}" title="${name}">
					 <div id="itemdescription">
					 <p><strong>Name: </strong>${name}<br><strong>Price: </strong>$${price}<br></p>
					 <span><strong>About the item:</strong><br></span>
					 <ul>${description.split('\n').map(line => `<li>${line.trim()}</li>`).join('')}</ul>
					 </div>`;

	const orderNowBtn = document.getElementById("orderNowBtn");
	orderNowBtn.onclick = orderPopup;
	const closePopupBtn = document.getElementById("closePopupBtn");
	closePopupBtn.onclick = closePopup;

}

function orderPopup(){

	if(confirm("Are you sure you wanna place your order?")){

		const tag = document.getElementById('OrderPlacedPopup');
		tag.style.display = "flex";

	}

}

function closePopup(){

	const tag = document.getElementById('OrderPlacedPopup');
	tag.style.display = "none";

}

/* UPDATE: code below is outdated, used to use body's id and stuff and setting the body color and bg color but now i am using
   document.documentElement.set/removeAttribute alongside data-theme to basically make it so that by default its light and you can toggle
   between dark and light*/


/*do note both functions will be used in every page as dark/light mode is universal*/


/*logic here is that body tags onload will call this function and pass its id, then it will check if the saved theme is Dark
and apply it else if it was white or if there was no saved theme then will just set to Light mode*/
/*function CheckSavedTheme(bodyid){
	const tag = document.getElementById(bodyid);
	const imgTag = document.getElementById("DarkLightImg")
	if(localStorage.getItem("theme") == "Dark"){
		tag.className = "Dark";
		imgTag.src = "assets/light-mode.png";
	}else{
		tag.className = "Light";
		imgTag.src = "assets/dark-mode.png";
	}
}*/

/*logic here is that we send the body's id, check its current class(Light or Dark) and will then change it to the opposite class 
and update the image. Finally we will locally store the theme so we the theme remains the same even after refreshing the page.*/
/*function toggleDarkLight(bodyid) { 
	const tag = document.getElementById(bodyid);
	const imgTag = document.getElementById("DarkLightImg");
	if(tag.className == "Dark"){
		tag.className = "Light";
		imgTag.src = "assets/dark-mode.png";
		localStorage.setItem("theme", "Light");
	}else{
		tag.className = "Dark";
		imgTag.src = "assets/light-mode.png";
		localStorage.setItem("theme", "Dark");
	}
}*/