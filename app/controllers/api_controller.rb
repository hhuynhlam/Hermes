# frozen_string_literal: true

class ApiController < ApplicationController
  include Pundit
  protect_from_forgery with: :null_session

  # FIXME: implement a token auth strategy
  skip_before_action :authenticate_user!

  def attributes(options = {})
    ActiveModelSerializers::Deserialization.jsonapi_parse(params, options)
  end

  def page
    params.permit(page: [:number]).dig(:page, :number) || 1
  end
end
