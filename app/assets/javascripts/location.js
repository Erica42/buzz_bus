$(document).ready(function() {
  $("form#set_route").on('submit', function(e){
    e.preventDefault();
    var trackingVal = $('.glyphicon').siblings().val();
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
  });

  $("#phone").on('click', function(e){
    e.preventDefault();
    $.get('/locations/new');
  })

  $('.modal').on('hidden.bs.modal', function (e) {
    console.log("hidden");
    window.location.reload();
  })
});







