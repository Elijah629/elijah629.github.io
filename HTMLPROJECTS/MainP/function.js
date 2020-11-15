window.onload = function onOpen() {
  console.log("LOADED");
  if (document.cookie.includes("mode=dark")) {
	Darkmode();
    	change();
  }
};

function Darkmode() {
	document.body.classList.toggle("dark-mode");
}

function change() {
	var b = document.getElementById("DMB");
	if(b.value == "Disable DarkMode") {
		b.value = "Enable DarkMode";
    		document.cookie = "mode=light";
	} else {
		b.value = "Disable DarkMode";
    		document.cookie = "mode=dark";
	}
}

function ShowHide(b) {
	if(document.getElementById(b).style.display == "none") {
		document.getElementById(b).style.display = "block";
	} else {
		document.getElementById(b).style.display = "none";
	}
}

function RNG() {
	document.getElementById("rng").innerHTML = Math.floor(Math.random() * $Genorator_Number);
}
var $Genorator_Number = 10001;