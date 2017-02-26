$(document).ready(function() {
  busGps = null;
  $("#stop_form").on('click', "#set_destination", function(e){
    e.preventDefault();
    stopGps = JSON.parse(($('#select_location').val()))
    busId = $("#bus_label").val();
    var stopLocation = { lat: stopGps[0], lng: stopGps[1] };
    var busLocation = { lat: 0, lng: 0 }
    fetchBus(busId);
    var interval = setInterval(function(){
      fetchBus(busId);

      busLocation = { lat: busGps.latitude, lng: busGps.longitude }
      if (arePointsNear(busLocation, stopLocation, .5)) {
        document.getElementById('phone').click();
        console.log("made it")
        clearInterval(interval);
      }
      }, 30000)
  })
});

var Bus = function(label, longitude, latitude, bearing, routeId){
  this.label = label;
  this.longitude = longitude;
  this.latitude = latitude;
  this.bearing = bearing;
  this.routeId = routeId;
}

function fetchBus(busId){
  var url = "https://lnykjry6ze.execute-api.us-west-2.amazonaws.com/prod/gtfsrt-debug?url=https://data.texas.gov/download/eiei-9rpf/application/octet-stream"
  return $.ajax({url: url, method: "GET", data: busId, success: callbackBus});
}

function callbackBus(response_json){
  var buses = parseBus(response_json);
  var label = busId;
  var busById = [];
  for(var i=0; i < buses.length; i++){
      if (buses[i].label === label){
        busById.push(buses[i])
      }
    }
  initMap(busById);
  busGps = busById[0]
}

function fetchBuses(userRoute){
  var url = "https://lnykjry6ze.execute-api.us-west-2.amazonaws.com/prod/gtfsrt-debug?url=https://data.texas.gov/download/eiei-9rpf/application/octet-stream"
  return $.ajax({url: url, method: "GET", data: userRoute, success: callback});
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
    // $("#stop_form").html("");
    $("#stop_form").append(response)
  });
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


function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}

// var busLocation = { lat: 59.615911, lng: 16.544232 };
// var stopLocation = { lat: 59.345635, lng: 18.059707 };

// var n = arePointsNear(busLocation, stopLocation, .25);



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


