function getCookie(name)
{
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

window.onload = function onOpen() {
  console.log("LOADED");
  if (typeof(getCookie("Darkmode")) === 'undefined') {} else {
	Darkmode();
    	change();
  }
}

function Darkmode() {
	document.body.classList.toggle("dark-mode");
}

function change() {
	var b = document.getElementById("DMB");
	if(b.value == "Disable DarkMode") {
		b.value = "Enable DarkMode";
    		document.cookie = "Darkmode= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	} else {
		b.value = "Disable DarkMode";
    		document.cookie = "Darkmode";
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