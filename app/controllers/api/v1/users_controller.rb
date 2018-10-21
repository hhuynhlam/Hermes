# frozen_string_literal: true

class Api::V1::UsersController < ApiController
  def index
    render json: User.all
  end

  def update
    user = User.find(params[:id])
    user.update!(attributes)

    render json: user
  end
end
