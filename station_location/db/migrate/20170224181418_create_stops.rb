class CreateStops < ActiveRecord::Migration[5.0]
  def change
    create_table :stops do |t|
    	t.integer :stop_id
    	t.string :stop_name, {null: false}
    	t.string :stop_desc, {null: false}
    	t.integer :route_id
    	t.integer :direction_id, {null: false}
    	t.float :stop_lat, {null: false}
    	t.float :stop_lon, {null: false}

      t.timestamps
    end
  end
end
