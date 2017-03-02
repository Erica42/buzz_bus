$(document).ready(function() {
  $("#map").removeClass("add_border");
  navigator.geolocation.getCurrentPosition(success, geo_error, geo_options)
  busGps = null;
  $("#stop_form").on('click', "#set_destination", function(e){
    e.preventDefault();

    if (screen.width <= 650) {
      $("main").hide();
    }

    $('#phone').on();
    stopGps = JSON.parse(($('#select_location').val()))
    busId = $("#bus_label").val();
    var trackingVal = $('.glyphicon').siblings().val();
    var stopLocation = { lat: stopGps[0], lng: stopGps[1] };
    var busLocation = { lat: 0, lng: 0 }

    if (trackingVal === "0") {
      navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
    } else if (trackingVal === "1") {
      fetchBus(busId, stopLocation);
      var interval = setInterval(function(){
        busLocation = { lat: busGps.lat, lng: busGps.lng }
        if (arePointsNear(busLocation, stopLocation, .5)) {
        document.getElementById('phone').click();
        console.log("made it")
        $('#phone').off();
        clearInterval(interval);
        } else {
          fetchBus(busId, stopLocation);
        }
      }, 20000)
    }
  })
});

var Bus = function(label, longitude, latitude, bearing, routeId){
  this.label = label;
  this.longitude = longitude;
  this.latitude = latitude;
  this.bearing = bearing;
  this.routeId = routeId;
}

function fetchBus(busId, stopLocation){
  var url = "https://lnykjry6ze.execute-api.us-west-2.amazonaws.com/prod/gtfsrt-debug?url=https://data.texas.gov/download/eiei-9rpf/application/octet-stream"
  return $.ajax({url: url, method: "GET", data: busId, stop: stopLocation, success: callbackBus});
}

function callbackBus(response_json){
  stopGps = JSON.parse(($('#select_location').val()));
  var stopLocation = { lat: stopGps[0], lng: stopGps[1] };
  var buses = parseBus(response_json);
  var label = busId;
  var busById = [];
  for(var i=0; i < buses.length; i++){
    if (buses[i].label === label){
      busById.push(buses[i])
    }
  }
  busGps = {
    lat: busById[0].latitude,
    lng: busById[0].longitude
  }
  console.log(busGps)
  initMap(busGps, stopLocation);
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
  $.ajax({
    url: "/buses",
    method: "POST",
    data: {data: data}
  }).done(function(response){
    $("#bus_form").html("");
    $("#bus_form").append(response);
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




