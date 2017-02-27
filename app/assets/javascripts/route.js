function fetchDirection(userRoute){
  $.ajax({
    url: "/routes/" + userRoute,
    type: "GET"
  }).done(function(direction){
   var routeDirection = parseRoute(direction)
   $("#route_form").html(appendRouteSelect(routeDirection));
  })
}

function parseRoute(response) {
  if (response === "Northbound") {
    return ["Northbound", "Southbound"]
  }
  else if (response === "Eastbound") {
    return ["Eastbound", "Westbound"]
  }
  else if (response === "Inbound") {
    return ["Inbound", "Outbound"]
  }
  else if (response === "Exposition") {
    return ["Exposition", "Exposition"]
  }
  else if (response === "Chicon") {
    return ["Chicon", "Chicon"]
  }
  else if (response === "E-Bus/Riverside") {
    return ["E-Bus/Riverside", "E-Bus/Riverside"]
  }
  else if (response === "MLK/University Of Texas") {
    return ["MLK/University Of Texas","MLK/University Of Texas"]
  }
  else if (response === "Kramer/Domain") {
    return ["Kramer/Domain", "Kramer/Domain"]
  }
  else if (response === "Forty Acres") {
    return ["Forty Acres", "Forty Acres"]
  }
  else if (response === "To Downtown") {
    return ["To Downtown", "To Leander"]
  }
  else if (response === "West Campus/UT") {
    return ["West Campus/UT","West Campus/UT"]
  }
  else if (response === "South Park") {
    return ["South Park","Tech Ridge"]
  }
  else if (response === "Domain") {
    return ["Domain","Westgate"]
  }

}

function appendRouteSelect(directions) {
 var form =  "<select id='direction' name='direction' form='direction'><option value=" + 1 + ">" + directions[0] + "</option><option value=" + 0 + ">" + directions[1] + "</option></select><button id='select_direction' type='submit'>Set Direction</button>"
  return form
}







