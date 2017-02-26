$(document).ready(function() {
  //function that calls bus json
  $("form#set_route").on('submit', function(e){
    e.preventDefault();
    userRoute = $("#route_id").val()
    fetchBuses(userRoute);
    fetchDirection(userRoute)
  })

  $("#route_form").on('click', "#select_direction", function(e){
    e.preventDefault();
    var routeDirection = $("#direction").val();
    $.ajax({
      url: "/locations",
      method: "POST",
      data: {route_id: userRoute, direction_id: routeDirection}
    }).done(function(response){
      // $("#bus_form").show();
      // $("#stop_form").html("");
      $("#stop_form").append(response)
  });
  });
});







