# frozen_string_literal: true

class ApiController < ApplicationController
  protect_from_forgery with: :null_session

  # FIXME: implement a token auth strategy
  skip_before_action :authenticate_user!
end
