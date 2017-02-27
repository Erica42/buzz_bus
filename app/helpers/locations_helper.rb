module LocationsHelper

  def locations_for_select(locations)
    locations.collect { |location| [location['stop_name']] }
  end

end

