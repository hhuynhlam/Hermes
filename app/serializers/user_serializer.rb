# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  attributes :address
  attributes :first_name
  attributes :last_name
  attributes :phone

  attributes :email
end
