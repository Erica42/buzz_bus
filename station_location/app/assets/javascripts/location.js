$(document).ready(function() {
  //function that calls bus json
  $("form#set_route").on('submit', function(e){
    e.preventDefault();
    userRoute = $("#route_id").val()
    fetchBuses(userRoute);
  })

  // $("#set_destination").on("submit", function(e){
  //   e.preventDefault();
  //    var locationData = $(this).serialize();
  //   $.ajax({
  //     url: '/locations/new',
  //     type: 'POST',
  //     data: locationData,
  //     dataType: 'json'
  //   }).done(function(response){
  //     var interval = setInterval(function(){
  //     initMap();
  //     if (this.pos.lat.toString() === response.latitude && this.pos.lng.toString() === response.longitude) {
  //       document.getElementById('bell').play();
  //       document.getElementById('phone').click();
  //       clearInterval(interval);
  //     }
  //     }, 5000);
  //  });
  // });
});

var Bus = function(label, longitude, latitude, bearing, routeId){
  this.label = label;
  this.longitude = longitude;
  this.latitude = latitude;
  this.bearing = bearing;
  this.routeId = routeId;
}

function callback(response_json){
  var allBuses = parseBus(response_json);
  var routeId = userRoute;
  var busesByRoute = [];
  for(var i=0; i < allBuses.length; i++){
      if (allBuses[i].routeId === routeId){
        busesByRoute.push(allBuses[i])
      }
    }
    var data = JSON.stringify(busesByRoute);
    // ajax call to server route and grab buses
  $.ajax({
    url: "/buses",
    method: "POST",
    data: {data}
  }).done(function(response){
    $("#bus_form").html("");
    $("#bus_form").append(response)
  });
}

function fetchBuses(userRoute){
  // var routeId = userRoute;
  console.log(userRoute)
  var url = "https://lnykjry6ze.execute-api.us-west-2.amazonaws.com/prod/gtfsrt-debug?url=https://data.texas.gov/download/eiei-9rpf/application/octet-stream"
  return $.ajax({url: url, method: "GET", data: userRoute, success: callback});
}

function parseBus(response_json) {
  var allBuses = [];
  var busNum = response_json.entity.length;
  for(var i = 0; i < busNum; i++ ) {
    var label = response_json.entity[i].vehicle.vehicle.label
    var longitude = response_json.entity[i].vehicle.position.longitude;
    var latitude = response_json.entity[i].vehicle.position.latitude;
    var bearing = response_json.entity[i].vehicle.position.bearing;
    var routeId = response_json.entity[i].vehicle.trip.route_id
    var newBus = new Bus(label, longitude, latitude, bearing, routeId)
      allBuses.push(newBus);
  }
  return allBuses;
}

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


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), { center: {lat: 30.34975814819336, lng: -97.7112045288086}, zoom: 15
    });
  var myloc = setBlueDot(map);
  var busloc = setBlueDot(map);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      this.user_pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.bus_pos = {
        lat: 30.34975814819336,
        lng: -97.7112045288086
      }
        myloc.setPosition(user_pos);
        map.setCenter(user_pos);
        busloc.setPosition(bus_pos);
        map.setCenter(bus_pos);
        }
        , function() {
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

// function geoFindMe() {
//   function success(position) {
//     var location = {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude
//     }
//     return location;
//   }
//   navigator.geolocation.getCurrentPosition(success);
// }
