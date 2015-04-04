require 'rails_helper'

RSpec.describe Project, type: :model do
  it { should belong_to :user }

  it { should have_valid(:user_id).when("5") }
  it { should have_valid(:title).when("This is a project") }
  it { should have_valid(:location).when("Walla Walla, WA") }

  it { should_not have_valid(:user_id).when(nil) }
  it { should_not have_valid(:title).when(nil) }
  it { should_not have_valid(:location).when(nil) }

  it { should validate_numericality_of :user_id }
end
