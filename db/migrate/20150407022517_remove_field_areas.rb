class RemoveFieldAreas < ActiveRecord::Migration
  def up
    drop_table :field_areas
  end

  def down
    create_table :field_areas
  end
end
