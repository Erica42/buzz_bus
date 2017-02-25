$(document).ready(function() {
  //function that calls bus json
  $("form#set_route").on('submit', function(e){
    e.preventDefault();
    userRoute = $("#route_id").val()
    fetchBuses(userRoute);
  })
});

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




