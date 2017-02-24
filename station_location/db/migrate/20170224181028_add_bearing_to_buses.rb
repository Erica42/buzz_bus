class AddBearingToBuses < ActiveRecord::Migration[5.0]
  def change
    add_column :buses, :bearing, :string, default: ""
  end
end
