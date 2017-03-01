# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

Route.pull_routes.each do |route|
  Route.create(route_id: route["route_id"], name: route["name"], headsign: route['directions'][0]['headsign'], active: true )
end

Route.pull_routes.each do |route|
  direction = 0
    Location.pull_stops(route["route_id"],direction).each do |stop|
		  	Location.find_or_create_by(stop_id: stop["stop_id"].to_i, stop_name: stop["stop_name"], stop_desc: stop["stop_desc"], route_id: stop["route_id"], direction_id: stop["direction_id"].to_i, stop_lat: stop["stop_lat"], stop_lon: stop["stop_lon"], active: true )
	 end
end

Route.pull_routes.each do |route|
  direction = 1
  if Location.pull_stops(route["route_id"], direction) != nil
    Location.pull_stops(route["route_id"], direction).each do |stop|
      	Location.find_or_create_by(stop_id: stop["stop_id"].to_i, stop_name: stop["stop_name"], stop_desc: stop["stop_desc"], route_id: stop["route_id"], direction_id: stop["direction_id"].to_i, stop_lat: stop["stop_lat"], stop_lon: stop["stop_lon"], active: true )
    end
  end
end
