class Route < ApplicationRecord
  has_many :locations
  has_many :buses

  def self.pull_routes
  	uri = URI("http://instabus.org/data/routes.json")
  	return JSON.parse(Net::HTTP.get(uri))
  end

  def self.update_routes
  end
  
end
