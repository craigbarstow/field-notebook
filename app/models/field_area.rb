class FieldArea < ActiveRecord::Base
  validates :title, presence: true
  validates :project, presence: true
end
