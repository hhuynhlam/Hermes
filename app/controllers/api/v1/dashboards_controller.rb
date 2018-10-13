# # frozen_string_literal: true
#
# class Api::V1::DashboardsController < ApiController
#   # FIXME: implement a token auth strategy
#   skip_before_action :authenticate_user!
#
#   def index
#     render json: current_user.dashboard
#   end
#
#   def create
#     dashboard = current_user.dashboard || Dashboard.new(user: current_user)
#     dashboard.layout = params[:layout].to_json
#     dashboard.save!
#
#     render json: dashboard
#   end
#
#   private
#
#   def current_user
#     User.find(params.require(:user_id))
#   end
# end
