# frozen_string_literal: true

class AdminController < ApplicationController
  skip_before_action :authenticate_user!

  def logout
    redirect_to '/admin', status: :unauthorized
  end
end
