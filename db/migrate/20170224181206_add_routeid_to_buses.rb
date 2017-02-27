class AddRouteidToBuses < ActiveRecord::Migration[5.0]
  def change
    add_column :buses, :routeId, :string, default: ""
  end
end
