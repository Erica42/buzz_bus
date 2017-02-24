require 'json'
class BusesController < ApplicationController
  include BusesHelper
  def create
    buses = JSON.parse(params[:data])
    @all_buses = []
    buses.each do |bus|
      @all_buses << bus
    end
    @all_buses
    render partial: "form_for_buses", locals: { all_buses: buses_for_select(@all_buses) }
  end

end
