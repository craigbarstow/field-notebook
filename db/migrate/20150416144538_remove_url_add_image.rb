class RemoveUrlAddImage < ActiveRecord::Migration
  def up
    remove_column :photos, :url
    add_column :photos, :image, :string
  end

  def down
    add_column :photos, :url, :string, null: false
    remove_column :photos, :image
  end
end
