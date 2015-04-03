class CreateFieldAreas < ActiveRecord::Migration
  def change
    create_table :field_areas do |t|
      t.integer :project_id, null: false
      t.string :title, null: false
      t.string :location
      t.string :date
      t.string :description
      t.text :summary
    end
  end
end
