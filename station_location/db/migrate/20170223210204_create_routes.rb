class CreateRoutes < ActiveRecord::Migration[5.0]
  def change
    create_table :routes do |t|
      t.string :name, { null: false }
      t.string :label, { null: false }

      t.timestamps
    end
  end
end
