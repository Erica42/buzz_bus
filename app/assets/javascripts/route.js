function fetchDirection(userRoute){
  $.ajax({
    url: "http://instabus.org/data/routes.json",
    type: "GET",
    data: userRoute,
    success: callbackRoute
  }).done(function(direction){
  })
}

function callbackRoute(response_json){
  var allRoutes = response_json;
  var routeDirection;
  var routeId = userRoute;
  for(var i=0; i < allRoutes.length; i++){
      if ((allRoutes[i].route_id).toString() === routeId){
        routeDirection = (parseRoute(allRoutes[i]))
      }
    }
  $("#route_form").html(appendRouteSelect(routeDirection));
}

function parseRoute(response) {
  if (response.directions[0].headsign === "Northbound") {
    return ["Northbound", "Southbound"]
  }
  else if (response.directions[0].headsign === "Eastbound") {
    return ["Eastbound", "Westbound"]
  }
}

function appendRouteSelect(directions) {
 var form =  "<select id='direction' name='direction' form='direction'><option value=" + 1 + ">" + directions[0] + "</option><option value=" + 0 + ">" + directions[1] + "</option></select><button id='select_direction'>Set Direction</button>"
  return form
}







