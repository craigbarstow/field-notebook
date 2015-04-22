class MapPoint < ActiveRecord::Base
  belongs_to :map

  validates :map_id, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
end
