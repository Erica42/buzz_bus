#require 'net/http'
class Location < ApplicationRecord
  belongs_to :route, optional: true

  def self.pull_stops(route, direction)
    uri = URI("http://instabus.org/data/stops_#{route}_#{direction}.json")
    return JSON.parse(Net::HTTP.get(uri))
  end

end



