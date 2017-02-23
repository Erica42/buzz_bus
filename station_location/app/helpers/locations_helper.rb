module LocationsHelper

  def locations_for_select
    Location.all.collect { |location| [location.name,location.id] }
  end

end
