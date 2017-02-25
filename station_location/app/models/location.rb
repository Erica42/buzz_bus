#require 'net/http'
class Location < ApplicationRecord
  belongs_to :route
  has_many :stops
end


