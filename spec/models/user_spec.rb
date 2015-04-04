require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many :projects }

  it { should have_valid(:email).when("me@example.com") }
  it { should have_valid(:encrypted_password).when("asdf821klsdfoai1") }


  it { should_not have_valid(:email).when(nil) }
  it { should_not have_valid(:encrypted_password).when(nil) }

  it { should validate_numericality_of :sign_in_count }
end
