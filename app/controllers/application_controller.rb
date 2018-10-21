# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :active?, if: :current_user

  def active?
    return if current_user.active?

    sign_out
    redirect_to '/users/sign_in', alert: 'You\'re account has been deactivated.'
  end
end
