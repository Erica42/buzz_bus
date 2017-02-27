class RoutesController < ApplicationController

  def show
    @route = Route.find(params[:id])
    render plain: @route.headsign
  end

end
