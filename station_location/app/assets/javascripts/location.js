$(document).ready(function() {
  $("#set_destination").on("submit", function(e){
    e.preventDefault();
     var locationData = $(this).serialize();
    $.ajax({
      url: '/locations/new',
      type: 'POST',
      data: locationData,
      dataType: 'json'
    }).done(function(response){
      var interval = setInterval(function(){
      initMap();
      if (this.pos.lat.toString() === response.latitude && this.pos.lng.toString() === response.longitude) {
        document.getElementById('bell').play();
        document.getElementById('phone').click();
        clearInterval(interval);
      }
      }, 5000);
   });
  });
});

   function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 15
        });
        var myloc = new google.maps.Marker({
        clickable: false,
        icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
              new google.maps.Size(22,22),
              new google.maps.Point(0,18),
              new google.maps.Point(11,11)),
        shadow: null,
        zIndex: 999,
        map: map
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            this.pos = {
              lat: 40.606023,
              lng: -74.277078
              // lat: position.coords.latitude,
              // lng: position.coords.longitude
            };
            myloc.setPosition(pos);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        }

        else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');

      }
