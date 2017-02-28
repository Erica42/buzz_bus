function setBlueDot(setMap){
  var map = setMap;
  var location = new google.maps.Marker({ clickable: false,icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
      new google.maps.Size(22,22),
      new google.maps.Point(0,18),
      new google.maps.Point(11,11)),
      shadow: null,
      zIndex: 999,
      map: map
  });
   return location;
 }

 function setDestinationMarker(setMap){
  var map = setMap;
  var location = new google.maps.Marker({ clickable: false,icon: new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569'),
      map: map
  });
   return location;
 }

 function initMap(currentBus, stopLocation) {
  if (currentBus != undefined) {
    var map = new google.maps.Map(document.getElementById('map'), { center: {lat: currentBus.lat, lng: currentBus.lng }, zoom: 15
      });

    var busloc = setBlueDot(map);
    var destloc = setDestinationMarker(map);

    var bus_pos = {
      lat: currentBus.lat,
      lng: currentBus.lng
    }

    var destination_pos = {
      lat: stopLocation.lat,
      lng: stopLocation.lng
    }

    busloc.setPosition(bus_pos);
    map.setCenter(bus_pos);
    destloc.setPosition(destination_pos);
  }
};

function geo_success(position) {
  stopGps = JSON.parse(($('#select_location').val()));
  var stopLocation = { lat: stopGps[0], lng: stopGps[1] };
  var gpsLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
  initMap(gpsLocation, stopLocation);
  var interval = setInterval(function(){
    initMap(gpsLocation, stopLocation);
    if (arePointsNear(gpsLocation, stopLocation, .25)) {
        document.getElementById('phone').click();
        console.log("made it")
        clearInterval(interval);
    }
  }, 30000)
}

function geo_error() {
  alert("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
};



