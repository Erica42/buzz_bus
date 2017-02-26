module LocationsHelper

  def locations_for_select(locations)
    locations.collect { |location| [location['stop_name']] }
  end

end

# def locations_for_select
#     Location.all.collect { |location| [location.name,location.id] }
# end
