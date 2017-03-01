$(document).ready(function() {
  $("form#set_route").on('submit', function(e){
    e.preventDefault();
    var trackingVal = $('.glyphicon').siblings().val();
    console.log(trackingVal)
    userRoute = $("#route_id").val()
    if (trackingVal === "0"){
      fetchDirection(userRoute)
    } else if(trackingVal === "1"){
      fetchBuses(userRoute);
      fetchDirection(userRoute)
    }
  })

  $("#route_form").on('click', "#select_direction", function(e){
    e.preventDefault();
    var routeDirection = $("#direction").val();
    $.ajax({
      url: "/locations",
      method: "POST",
      data: {route_id: userRoute, direction_id: routeDirection}
    }).done(function(response){
      console.log("fired")
      $("#bus_form").show();
      $("#stop_form").html("");
      $("#stop_form").append(response)
    });
  });

  $(".btn-circle").on("click", function(e){
    e.preventDefault();
    var imgSelect = $(this).find('input');
    $('.glyphicon').remove()
    imgSelect.after('<i class="glyphicon glyphicon-ok"></i>');
  })
});







