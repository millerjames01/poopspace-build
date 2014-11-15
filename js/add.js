$( document ).ready(function() {
	$('form button').click(function(event) {
		event.preventDefault();
		
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(postData);
		}
		
		function postData(position) {
			var data = {
				location: $('form input#inputLoc').val(),
				latitude: position.coords.longitude,
				longitude: position.coords.latitude,
				experience: $('select#experience').val(),
				cleanliness: $('select#cleanliness').val(),
				facilities: $('select#facilities').val(),
				atmosphere: $('select#atmosphere').val(),
				poop: $('select#poop').val(),
				notes: $('textarea#notes').val()
			}
			console.log(data);
			$.post('http://arcane-citadel-1794.herokuapp.com/api/add', $.param(data), function(returnData) {
				if(returnData == "success") {
					window.location.replace("index.html");
				}
			});
		}
	});
});
