class AddFieldsToMaps < ActiveRecord::Migration
  def up
    add_column :maps, :center_lat, :string, null: false
    add_column :maps, :center_lng, :string, null: false
    add_column :maps, :zoom, :integer, null: false
  end

  def down
    remove_column :maps, :center_lat
    remove_column :maps, :center_lng
    remove_column :maps, :zoom
  end
end
