class AddTextFields < ActiveRecord::Migration
  def change
    create_table(:text_areas) do |t|
      t.integer :project_id, null: false
      t.text :content, null: false
      t.timestamps
    end
  end
end
