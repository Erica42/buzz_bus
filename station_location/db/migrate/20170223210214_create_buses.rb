class CreateBuses < ActiveRecord::Migration[5.0]
  def change
    create_table :buses do |t|
      t.string :label, { null: false }
      t.float :latitude, { null: false }
      t.float :longitude, { null: false }

      t.timestamps
    end
  end
end
