class AddProjects < ActiveRecord::Migration
  def change
    create_table(:projects) do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :location, null: false
      t.string :coordinates
      t.string :description
      t.datetime :date
      t.timestamps
    end
  end
end
