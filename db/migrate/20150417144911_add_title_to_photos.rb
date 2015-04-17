class AddTitleToPhotos < ActiveRecord::Migration
  def up
    add_column :photos, :title, :string
    change_column :photos, :image, :string, null: false
  end

  def down
    remove_column :photos, :title
    change_column :photos, :image, :string, null: true
  end
end
