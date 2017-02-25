$(document).ready(function() {
  $("#bus_form").on('click', "#select_bus", function(e){
    e.preventDefault();
    busId = $("#bus_label").val();
    fetchBus(busId)
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
  // console.log(busById);
  initMap(busById);
}



