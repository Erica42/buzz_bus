class Route < ApplicationRecord
  has_many :locations
  has_many :buses
end
