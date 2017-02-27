class AddActiveRoute < ActiveRecord::Migration[5.0]
  def change
  	add_column :routes, :active, :boolean
  end
end
