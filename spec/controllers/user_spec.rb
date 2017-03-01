require "rails_helper"

describe UsersController do 
	describe "Post create" do
		it "Creates a new user" do
			params = {name: "test", email: "test", password: "password", phone: '+12345678901'}
			post :create, { user: params }
		expect(User.all.last[:name]).to eq(params[:name])
		end
	end
end