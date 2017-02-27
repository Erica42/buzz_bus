class User < ApplicationRecord
  validates :email, :phone, uniqueness: true
  validates_presence_of :name, :email, :password, :phone
  validates_format_of :phone, :with => /\A\D\d{11}\z/, :on => :create
  has_secure_password
end
