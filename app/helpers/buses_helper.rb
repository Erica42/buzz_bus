module BusesHelper

  def buses_for_select(buses)
   buses.collect { |bus| [bus['label']] }
  end

end
