/*do note both functions will be used in every page as dark/light mode is universal*/


/*logic here is that body tags onload will call this function and pass its id, then it will check if the saved theme is Dark
and apply it else if it was white or if there was no saved theme then will just set to Light mode*/
function CheckSavedTheme(bodyid){
	const tag = document.getElementById(bodyid);
	const imgTag = document.getElementById("DarkLightImg")
	if(localStorage.getItem("theme") == "Dark"){
		tag.className = "Dark";
		imgTag.src = "assets/light-mode.png";
	}else{
		tag.className = "Light";
		imgTag.src = "assets/dark-mode.png";
	}
}

/*logic here is that we send the body's id, check its current class(Light or Dark) and will then change it to the opposite class 
and update the image. Finally we will locally store the theme so we the theme remains the same even after refreshing the page.*/
function toggleDarkLight(bodyid) { 
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
}

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
            	<img src="${items[i].imagepath}" alt="${items[i].name}">
            	<p><strong>Name:</strong> ${items[i].name}<br><strong>Price:</strong> \$${items[i].price}</p>
        	</div>`
		}
  	})

}