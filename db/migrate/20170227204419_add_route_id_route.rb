class AddRouteIdRoute < ActiveRecord::Migration[5.0]
  def change
  	add_column :routes, :route_id, :string
  end
end
