class Project < ActiveRecord::Base
  belongs_to :user

  validates :user_id, presence: true, numericality: { only_integer: true}
  validates :title, presence: true
  validates :location, presence: true
end
