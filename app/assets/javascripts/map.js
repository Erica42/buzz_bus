function setBlueDot(setMap){
  var map = setMap;
  var location = new google.maps.Marker({ clickable: false,icon: new google.maps.MarkerImage('https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'),
      // new google.maps.Size(22,22),
      // new google.maps.Point(0,18),
      // new google.maps.Point(11,11)),
      // shadow: null,
      // zIndex: 999,
      map: map
  });
   return location;
 }

 function initMap(currentBus) {
  console.log("initMap")
  if (currentBus != undefined) {
    var map = new google.maps.Map(document.getElementById('map'), { center: {lat: currentBus[0].latitude, lng: currentBus[0].longitude}, zoom: 15
      });
    var myloc = setBlueDot(map);
    var busloc = setBlueDot(map);
    if (navigator.geolocation) {
      alert('Geolocation is supported!');
      navigator.geolocation.getCurrentPosition(function(position) {
        this.user_pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.bus_pos = {
          lat: currentBus[0].latitude,
          lng: currentBus[0].longitude
        }
          myloc.setPosition(user_pos);
          map.setCenter(user_pos);
          busloc.setPosition(bus_pos);
          map.setCenter(bus_pos);
          }
          , function() {
              handleLocationError(true, map, map.getCenter());
      });
    } else {
      alert('Geolocation is not supported for this Browser/OS version yet.');
      handleLocationError(false, map, map.getCenter());
    }
  }
};

  function handleLocationError(browserHasGeolocation, map, pos) {
        map.setPosition(pos);
        map.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
  }


