#require 'net/http'
class Location < ApplicationRecord
  belongs_to :route, optional: true

  def self.pull_stops(route, direction)
    uri = URI("http://instabus.org/data/stops_#{route}_#{direction}.json")
    return JSON.parse(Net::HTTP.get(uri))
  end

  #Iterates over the database and updates stops active status
  def self.update_stops
  	update = []
  	Route.pull_routes.each do |route|
  		direction = 0
  			Location.pull_stops(route["route_id"],direction).each do |stop|
  				update << {stop_id: stop["stop_id"].to_i, stop_name: stop["stop_name"], stop_desc: stop["stop_desc"], route_id: stop["route_id"], direction_id: stop["direction_id"].to_i, stop_lat: stop["stop_lat"], stop_lon: stop["stop_lon"]}
  			end
  		end
  			##creates new stops if they exist
  			update.each do |stop| 
  				if Location.where(stop) == nil
  					Location.create(stop)
  					puts "Location #{stop} has been created"
  				end
  			end
  			Location.all.each do  |stop|
  			if (update.find { |x| [x[:stop_id], x[:stop_lat], x[:stop_lon]] == [stop[:stop_id], stop[:stop_lat], stop[:stop_lon]] }) != nil
  				stop[:active] = "true"
  				stop.save
  				puts "Record #{stop[:id]} of #{Location.all.count} is active"
  			else
  				stop[:active] = "false"
  				stop.save
  				puts "Record #{stop[:id]} of #{Location.all.count} is false"
  		end
  	end
  end


end



