function HTMLParser(string){
	var div = document.createElement('div');
	div.innerHTML = string;
	return div;
}
function retrieveNextPage(page) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var xmlResponse = xmlhttp.responseText;
			HTML = HTMLParser(xmlResponse);
			var list = HTML.getElementsByTagName("ul")[3].innerHTML;
			//console.log(list);
			document.getElementById("list").innerHTML = document.getElementById("list").innerHTML + "\n" + "<hr><br><center><h1>Page " + page + "</h1><small>Brought to you by MacHacker<small></center><br><hr>" + "\n" + list;
		};
	};

	url = "https://legacy.hackerexperience.com/list?page=" + page;
	console.log(url);
	xmlhttp.open("GET", url, true);
	xmlhttp.withCredentials = true;
	xmlhttp.send(null);

}

footer = document.getElementsByClassName("pagination alternate")[0];
F_liTags = footer.getElementsByTagName("li");
numberOfPages = F_liTags[F_liTags.length - 2].innerText;
cycledPages = 1;
$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() == $(document).height()) {
		if (cycledPages != numberOfPages){
			cycledPages += 1;
			retrieveNextPage(cycledPages);

		}
	}
});