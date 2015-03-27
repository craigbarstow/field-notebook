class Project < ActiveRecord::Base
  validates :user_id, presence: true
  validates :title, presence: true
  validates :title, presence: true
end
