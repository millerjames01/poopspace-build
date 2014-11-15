$( document ).ready(function() {
	$('#map').height($(window).height() - 55);
	
	
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initMap);
	} else {
		var map = L.map('map').setView([51.05, -0.09], 16);
		addTiles(map);
	}
	
	function initMap(position) {
		var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 16);
		var data = {
			"longitude": position.coords.longitude,
			"latitude": position.coords.latitude
		}
		$.post("http://134.173.222.99:9000/api/nearbyPoops", data, function(arrayOfNearby) {
			for(i = 0; i < arrayOfNearby.length; i++) {
				var current = arrayOfNearby[i];
				if(current["location"] == "") {
					current["location"] = "An Untitled Poop"
				}
				var popupContent = "<h3>" + current["location"] + "</h3>" +
				   "<h4>" + current["time"] + "</h4>" + 
				   "<div><em>Overall Experience</em> " + current["experience"] + "</div>" +
				   "<div><em>Cleanliness</em> " + current["cleanliness"] + "</div>" +
				   "<div><em>Facilities</em> " + current["facilities"] + "</div>" +
				   "<div><em>Atmosphere</em> " + current["atmosphere"] + "</div>" +
				   "<div><em>Poop</em> " + current["poop"] + "</div>" +
				   "<p>" + current["notes"] + "</p>";
				L.marker([current["latitude"], current["longitude"]]).bindPopup(popupContent).addTo(map);
			}
		});
		var icon = L.icon({
			iconUrl: 'jsImages/frontal7.png',
			iconSize: [48, 48]
		});
		L.marker([position.coords.latitude, position.coords.longitude]).setIcon(icon).addTo(map);
		addTiles(map);
	}
	
	function addTiles(map) {
		L.tileLayer('http://{s}.tiles.mapbox.com/v3/millerjames01.k7mj3gjf/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18
		}).addTo(map);
	}
});