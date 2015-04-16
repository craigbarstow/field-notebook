class Photo < ActiveRecord::Base
  mount_uploader :image, ProjectPhotoUploader

  belongs_to :project

  # validates :url, presence: true
end
