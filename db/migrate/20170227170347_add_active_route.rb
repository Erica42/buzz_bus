class AddActiveRoute < ActiveRecord::Migration[5.0]
  def change
  	add_column :routes, :active, :string
  end
end
