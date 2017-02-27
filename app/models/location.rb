#require 'net/http'
class Location < ApplicationRecord
	belongs_to :route, optional: true

	def self.pull_stops(route_id, direction)
		uri = URI("http://instabus.org/data/stops_#{route_id}_#{direction}.json")
		response = Net::HTTP.get(uri)
		begin 
			return JSON.parse(response)
		rescue 
			puts "Page Not Found for route #{route_id}, direction #{direction}"
		end
	end

  #Iterates over the database and updates stops active status
  def self.update_stops
  	
  	directions = [0,1]  # [north, south]
  	directions.each do |count|
  		# break if count >= 2 
  		update = []
  		Route.pull_routes.each do |route|
  			direction = (count)
  			Location.pull_stops(route["route_id"], direction).each do |stop|
  				if stop.is_a?(Hash)
  					update << {stop_id: stop["stop_id"].to_i, stop_name: stop["stop_name"], stop_desc: stop["stop_desc"], route_id: stop["route_id"], direction_id: stop["direction_id"].to_i, stop_lat: stop["stop_lat"], stop_lon: stop["stop_lon"]}				
  				end
  			end
  		end
  		##creates new stops if they exist
  		update.each do |stop| 
  			if Location.where(stop) == nil
  				new_stop = Location.new(stop)
  				if new_stop.save
  					puts "Location #{stop} has been created"
  				else 
  					puts "Stop could not be saved"
  				end
  			end
  		end
  		Location.all.each do  |stop|
  			if (update.find { |x| [x[:stop_id], x[:stop_lat], x[:stop_lon]] == [stop[:stop_id], stop[:stop_lat], stop[:stop_lon]] }) != nil
  				stop[:active] = "true"
  				stop.save
  				puts "Direction: #{count}, Record #{stop[:id]} of #{Location.all.count} is active"
  			else
  				stop[:active] = "false"
  				stop.save
  				puts "Direction: #{count}, Record #{stop[:id]} of #{Location.all.count} is false"
  			end
  		end
  	end
  end

 end



