class User < ApplicationRecord
	before_validation :validate_phone

  validates :email, :phone, uniqueness: true
  validates_presence_of :name, :email, :password, :phone
  validates_format_of :phone, :with => /\A\D\d{11}\z/, :on => :create
  has_secure_password

  def validate_phone
    temp = self.phone.dup
    temp = temp.match(/(\d{3})\D?(\d{3})\D?(\d{4})/i).captures.join("")
    self.phone = temp.prepend("+1")
  end
end
