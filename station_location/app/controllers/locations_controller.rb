require 'json'
class LocationsController < ApplicationController
  include LocationsHelper
  include SessionsHelper # do we need this for locations?

  def index
    @locations = Location.all
  end

  def create
    binding.pry
    locations = Location.all.where(route_id: params[:data])
    @allLocations = []
    locations.each do |location|
      @allLocations << location
    end
    @allLocations
    render partial: "form_for_locations",
      locals:{ allLocations:
    locations_for_select(@allLocations) }
  end
    # @location = Location.find(params[:category_id])
    # params = { name: @location.name, latitude: @location.latitude.to_s, longitude: @location.longitude.to_s }.to_json
    # if request.xhr?
    #   params
    # else
    #   redirect_to locations_path
    # end

  def new
    @user = User.find(current_user)
    @client = Twilio::REST::Client.new
  #   @client.messages.create(
  #   from: '+18489995632',
  #   to: '+18482506213',
  #   body: 'You Have Arrived!'
  # )
    @call = @client.calls.create(
    from: '+18489995632',
    to: "#{@user.phone}",
    url: 'http://example.com/call-handler'
  )
    redirect_to locations_path
  end

end
