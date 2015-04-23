class AddMaps < ActiveRecord::Migration
  def change
    create_table(:maps) do |t|
      t.integer :project_id, null: false
      t.text :caption
      t.string :title
      t.timestamps
    end
    create_table(:map_points) do |t|
      t.integer :map_id, null: false
      t.decimal :latitude, null: false
      t.decimal :longitude, null: false
    end
  end
end
