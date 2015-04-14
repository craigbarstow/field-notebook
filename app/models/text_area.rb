class TextArea < ActiveRecord::Base
  belongs_to :project

  validates :project_id, presence: true, numericality: { only_integer: true}
  validates :content, presence: true
end
