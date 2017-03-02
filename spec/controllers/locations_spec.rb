require "rails_helper"

describe LocationsController do 
	describe "GET index" do
		it "responds with status code 200" do
			get :index, params: {}
		expect(response).to have_http_status 200
		end
	end
	describe "GET Create" do 
		it "Creates a new location" do 
			get :create, params: {route_id: 1, direction_id: 0}
			expect(response).to have_http_status 200
		end
	end
end