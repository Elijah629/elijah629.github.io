var index, search;
function metas(a) {
	"use strict";
	return fetch("https://cors-anywhere.herokuapp.com/" + a).then(b => b.text()).then(c => {
		const d = new DOMParser().parseFromString(c, "text/xml");
		const e = d.getElementsByTagName('meta');
		for (let f = 0; f < e.length; f++) {
			if (e[f].getAttribute('name') === "description") {
				return e[f].getAttribute('content').replace("undefined", "");
			}
		}
	});
}

function sites(sitemap) {
	"use strict";
	return fetch(sitemap).then(a => a.text()).then(b => {
		const c = new DOMParser().parseFromString(b, "text/xml");
		var d = c.getElementsByTagName("loc");
		var e;
		for (var f = 0; f < d.length; f++) {
			e += d[f].childNodes[0].nodeValue + "\n";
		}
		var g = e.replace("undefined", "");
		return g.substring(0, g.lastIndexOf("\n")).split("\n");
	});
}

function titles(a) {
	"use strict";
	return fetch("https://cors-anywhere.herokuapp.com/" + a).then(b => b.text()).then(c => {
		return c.split('<title>')[1].split('</title>')[0];
	});
}
async function indexbuilder(sitemap) {
	"use strict";
	var sites_TMP, meta_TMP, title_TMP, x;
	await sites("https://cors-anywhere.herokuapp.com/" + sitemap).then(_ => {
		sites_TMP = _;
	});
	const site = sites_TMP;
	for (var i = 0; i < site.length; i++) {
		await metas(site[i]).then(_ => {
			meta_TMP = _;
		});
		const meta = meta_TMP;
		await titles(site[i]).then(_ => {
			title_TMP = _;
		});
		const title = title_TMP;
		x += `{\n"url":"${site[i]}",\n"title":"${title}",\n"description":"${meta}"\n},`;
	}
	var l = x.replace("undefined", "").slice(0, -1);
	index = JSON.parse("[" + l + "]");
	ready();
}

function ready() {
	"use strict";
	if (index != undefined) {
		setup(index);
	} else {
		setTimeout(function () {
			ready();
		}, 100);
	}
}

function setup(index) {
	"use strict";
	search = lunr(function () {
		this.ref("url");
		this.field("title");
		this.field("description");
		index.forEach(function (doc) {
			this.add(doc);
		}, this);
	});
	searcher();
}
async function createresult(element, urls) {
	"use strict";
	var meta_TMP, title_TMP;
	await metas(urls).then(_ => { meta_TMP = _; });
	const meta = meta_TMP;
	await titles(urls).then(_ => { title_TMP = _; });
	const titlet = title_TMP;
	var row = document.createElement("tr");
	var data = document.createElement("td");
	data.setAttribute("onclick", "window.location='" + urls + "';");
	var title = document.createElement("p");
	title.innerHTML = titlet;
	var br1 = document.createElement("br");
	title.setAttribute("class", "title p");
	var url = document.createElement("p");
	var br2 = document.createElement("br");
	url.setAttribute("class", "url p");
	url.innerHTML = urls;
	var description = document.createElement("p");
	description.innerHTML = meta;
	description.setAttribute("class", "des p");
	row.appendChild(data);
	await data.appendChild(title);
	await data.appendChild(br1);
	await data.appendChild(url);
	await data.appendChild(br2);
	await data.appendChild(description);
	await row.appendChild(data);
	element.appendChild(row);
}
function searcher() {
  "use strict";
	try {
		if (new URLSearchParams(window.location.search).has("q") && new URLSearchParams(window.location.search).get("q") != "" && new URLSearchParams(window.location.search).get("q").replace(/\s/g, '').length) {
			const query = new URLSearchParams(window.location.search).get("q");
			var results = document.createElement("table");
			var header = document.createElement("th");
			header.innerHTML = "<form action=\"https://elijah629.github.io\"><input placeholder=\"Type here to search\" type=\"text\" id=\"q\" name=\"q\" value=\"" + query + "\"/><input type=\"submit\" value=\"Search\"></form><a class=\"gg-arrow-left-r\" style=\"top:35px;position:absolute;right:15px;\" href=\"https://elijah629.github.io/\"></a>";
			results.appendChild(header);
			var a = search.search(query);
			var b = JSON.stringify(a);
			var c = JSON.parse(b);
			for (var i = 0; i < c.length; i++) {
				createresult(results, c[i].ref);
			}
			document.body.innerHTML = "";
			document.body.appendChild(results);
		} else {
			var form = document.createElement("form");
			form.setAttribute("action", "https://elijah629.github.io");
			form.setAttribute("style", "top:15px;position:absolute;right:15px;");
			var searchbar = document.createElement("input");
			searchbar.setAttribute("type", "text");
			searchbar.setAttribute("id", "q");
			searchbar.setAttribute("name", "q");
			searchbar.setAttribute("placeholder","Type here to search");
			form.appendChild(searchbar);
			var searchbutton = document.createElement("input");
			searchbutton.setAttribute("type", "submit");
			searchbutton.setAttribute("value", "Search");
			form.appendChild(searchbutton);
			document.body.appendChild(form);
		}
	 }catch(e){
		document.body.innerHTML = "<h1>Internal error has occured:</h1><p>"+e+"</p><p>Click the arrow to get back on track!</p><a class=\"gg-arrow-left-r\" href=\"https://elijah629.github.io/\"></a>";
	}
}
window.onload = function () {
  "use strict";
   indexbuilder("https://elijah629.github.io/sitemap.xml");
};
/* SCRIPT_OLD_SMALL.js
var index, search;
function metas(a) {
  return fetch("https://cors-anywhere.herokuapp.com/" + a).then(function(b) {
    return b.text();
  }).then(function(b) {
    b = (new DOMParser).parseFromString(b, "text/xml").getElementsByTagName("meta");
    for (var c = 0; c < b.length; c++) {
      if ("description" === b[c].getAttribute("name")) {
        return b[c].getAttribute("content").replace("undefined", "");
      }
    }
  });
}
function sites(a) {
  return fetch(a).then(function(b) {
    return b.text();
  }).then(function(b) {
    b = (new DOMParser).parseFromString(b, "text/xml").getElementsByTagName("loc");
    for (var c, d = 0; d < b.length; d++) {
      c += b[d].childNodes[0].nodeValue + "\n";
    }
    c = c.replace("undefined", "");
    return c.substring(0, c.lastIndexOf("\n")).split("\n");
  });
}
function titles(a) {
  return fetch("https://cors-anywhere.herokuapp.com/" + a).then(function(b) {
    return b.text();
  }).then(function(b) {
    return b.split("<title>")[1].split("</title>")[0];
  });
}
function indexbuilder(a) {
  var b, c, d, e, g, f, h, l, p;
  return $jscomp.asyncExecutePromiseGeneratorProgram(function(k) {
    switch(k.nextAddress) {
      case 1:
        return k.yield(sites("https://cors-anywhere.herokuapp.com/" + a).then(function(n) {
          b = n;
        }), 2);
      case 2:
        g = b, f = 0;
      case 3:
        if (!(f < g.length)) {
          k.jumpTo(5);
          break;
        }
        return k.yield(metas(g[f]).then(function(n) {
          c = n;
        }), 6);
      case 6:
        return h = c, k.yield(titles(g[f]).then(function(n) {
          d = n;
        }), 7);
      case 7:
        l = d;
        e += '{\n"url":"' + g[f] + '",\n"title":"' + l + '",\n"description":"' + h + '"\n},';
        f++;
        k.jumpTo(3);
        break;
      case 5:
        p = e.replace("undefined", "").slice(0, -1), index = JSON.parse("[" + p + "]"), ready(), k.jumpToEnd();
    }
  });
}
function ready() {
  void 0 != index ? setup(index) : setTimeout(function() {
    ready();
  }, 100);
}
function setup(a) {
  search = lunr(function() {
    this.ref("url");
    this.field("title");
    this.field("description");
    a.forEach(function(b) {
      this.add(b);
    }, this);
  });
  searcher();
}
function createresult(a, b) {
  var c, d, e, g, f, h, l, p, k, n, q;
  return $jscomp.asyncExecutePromiseGeneratorProgram(function(m) {
    switch(m.nextAddress) {
      case 1:
        return m.yield(metas(b).then(function(r) {
          c = r;
        }), 2);
      case 2:
        return e = c, m.yield(titles(b).then(function(r) {
          d = r;
        }), 3);
      case 3:
        return g = d, f = document.createElement("tr"), h = document.createElement("td"), h.setAttribute("onclick", "window.location='" + b + "';"), l = document.createElement("p"), l.innerHTML = g, p = document.createElement("br"), l.setAttribute("class", "title p"), k = document.createElement("p"), n = document.createElement("br"), k.setAttribute("class", "url p"), k.innerHTML = b, q = document.createElement("p"), q.innerHTML = e, q.setAttribute("class", "des p"), f.appendChild(h), m.yield(h.appendChild(l), 
        4);
      case 4:
        return m.yield(h.appendChild(p), 5);
      case 5:
        return m.yield(h.appendChild(k), 6);
      case 6:
        return m.yield(h.appendChild(n), 7);
      case 7:
        return m.yield(h.appendChild(q), 8);
      case 8:
        return m.yield(f.appendChild(h), 9);
      case 9:
        a.appendChild(f), m.jumpToEnd();
    }
  });
}
function searcher() {
  try {
    if ((new URLSearchParams(window.location.search)).has("q") && "" != (new URLSearchParams(window.location.search)).get("q") && (new URLSearchParams(window.location.search)).get("q").replace(/\s/g, "").length) {
      var a = (new URLSearchParams(window.location.search)).get("q"), b = document.createElement("table"), c = document.createElement("th");
      c.innerHTML = '<form action="https://elijah629.github.io"><input placeholder="Type here to search" type="text" id="q" name="q" value="' + a + '"/><input type="submit" value="Search"></form><a class="gg-arrow-left-r" style="top:35px;position:absolute;right:15px;" href="https://elijah629.github.io/"></a>';
      b.appendChild(c);
      var d = search.search(a), e = JSON.stringify(d), g = JSON.parse(e);
      for (a = 0; a < g.length; a++) {
        createresult(b, g[a].ref);
      }
      document.body.innerHTML = "";
      document.body.appendChild(b);
    } else {
      var f = document.createElement("form");
      f.setAttribute("action", "https://elijah629.github.io");
      f.setAttribute("style", "top:15px;position:absolute;right:15px;");
      var h = document.createElement("input");
      h.setAttribute("type", "text");
      h.setAttribute("id", "q");
      h.setAttribute("name", "q");
      h.setAttribute("placeholder", "Type here to search");
      f.appendChild(h);
      var l = document.createElement("input");
      l.setAttribute("type", "submit");
      l.setAttribute("value", "Search");
      f.appendChild(l);
      document.body.appendChild(f);
    }
  } catch (p) {
    document.body.innerHTML = "<h1>Internal error has occured:</h1><p>" + p + '</p><p>Click the arrow to get back on track!</p><a class="gg-arrow-left-r" href="https://elijah629.github.io/"></a>';
  }
}
window.onload = function() {
  indexbuilder("https://elijah629.github.io/sitemap.xml");
};
*/
