class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :projects

  validates :email, presence: true
  validates :encrypted_password, presence: true
  validates :sign_in_count, presence: true,
    numericality: { greater_than_or_equal_to: 0 }
end
