# frozen_string_literal: true

class Ui::RootController < ApplicationController
  def show
    @features = FEATURE
                .features
                .map(&:name)
                .map { |feature| [feature, FEATURE.enabled?(feature.to_sym)] }
                .to_h
    @store = {
      data: {
        currentUser: ActiveModelSerializers::SerializableResource.new(current_user, {})
      }
    }

    render :show
  end
end
