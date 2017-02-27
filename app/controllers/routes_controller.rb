class RoutesController < ApplicationController

  def show
    @route = Route.find_by(route_id: params[:id])
    render plain: @route.headsign
  end

end
