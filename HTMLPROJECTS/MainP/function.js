function onOpen() {
  if (getCookie("mode=dark") != null) {
  	Darkmode();
    	change();
  }
}

window.onload = onOpen;

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

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
    document.cookie = "mode=light";
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