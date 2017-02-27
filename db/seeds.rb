# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#Location.delete_all
#
#Location.create(name: "Rahway", latitude: 40.606023, longitude: -74.277078 )
#Location.create(name: "Linden", latitude: 40.629779, longitude: -74.250908 )
#Location.create(name: "Elizabeth", latitude: 40.666778, longitude: -74.215761)
#Location.create(name: "Newark Airport Station", latitude: 40.704392, longitude: -74.190708)
#Location.create(name: "Newark Penn Station", latitude: 40.734647, longitude: -74.164431)
#Location.create(name: "Seacus Junction", latitude: 40.761661, longitude: -74.074374 )
#Location.create(name: "New York Penn Station", latitude: 40.750568, longitude: -73.993519 )


Route.pull_routes.each do |route|
	Route.create(route_id: route["route_id"], name: route["name"], active: true )
end

Route.pull_routes.each do |route|
  direction = 0
    Location.pull_stops(route["route_id"],direction).each do |stop|
    	if Location.where(direction_id: stop["direction_id"].to_i, stop_lat: stop["stop_lat"], stop_lon: stop["stop_lon"]).empty?
		  	Location.create(stop_id: stop["stop_id"].to_i, stop_name: stop["stop_name"], stop_desc: stop["stop_desc"], route_id: stop["route_id"], direction_id: stop["direction_id"].to_i, stop_lat: stop["stop_lat"], stop_lon: stop["stop_lon"], active: true )
		  end
	 end
end

Route.pull_routes.each do |route|
  direction = 1
  if Location.pull_stops(route["route_id"], direction) != nil
    Location.pull_stops(route["route_id"], direction).each do |stop|
    	if Location.where(direction_id: stop["direction_id"].to_i, stop_lat: stop["stop_lat"], stop_lon: stop["stop_lon"]).empty?
      	Location.create(stop_id: stop["stop_id"].to_i, stop_name: stop["stop_name"], stop_desc: stop["stop_desc"], route_id: stop["route_id"], direction_id: stop["direction_id"].to_i, stop_lat: stop["stop_lat"], stop_lon: stop["stop_lon"], active: true )
   		end
    end
  end
end
