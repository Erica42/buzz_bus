require 'json'
class LocationsController < ApplicationController
  include LocationsHelper
  include SessionsHelper # do we need this for locations?

  def index
    @locations = Location.all
  end

  def create
    @locations = Location.where(route_id: params[:route_id].to_i, direction_id: params[:direction_id].to_i)
    @all_locations = []
    @locations.each do |location|
      @all_locations << location.stop_name
    end
    @all_locations
    render partial: "form_for_locations",
      locals:{ allLocations:
    locations_for_select(@all_locations) }

  end

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
