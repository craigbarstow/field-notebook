class Photo < ActiveRecord::Base
  mount_uploader :url, ProjectPhotoUploader

  belongs_to :project

  validates :url, presence: true
end
