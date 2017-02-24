module StopsHelper

  def stops_for_select
    Stop.all.collect { |location| [location.name,location.id] }
  end

end
