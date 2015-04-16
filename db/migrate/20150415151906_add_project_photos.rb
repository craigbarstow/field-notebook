class AddProjectPhotos < ActiveRecord::Migration
  def change
    create_table(:photos) do |t|
      t.integer :project_id, null: false
      t.string :url, null: false
      t.text :caption
      t.timestamps
    end
  end
end
