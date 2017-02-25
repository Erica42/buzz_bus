class Stop < ApplicationRecord
	belongs_to :route, optional: true

	def self.pull_stops(route)
		uri = URI("http://instabus.org/data/stops_#{route}_1.json")
		return JSON.parse(Net::HTTP.get(uri))
	end

end
