class Map < ActiveRecord::Base
  belongs_to :project
  validates :project_id, presence: true
end
