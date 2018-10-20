# frozen_string_literal: true

class Ui::RootController < ApplicationController
  def show
    @features = FEATURE
                .features
                .map(&:name)
                .map { |feature| [feature, FEATURE.enabled?(feature.to_sym)] }
                .to_h

    @store = StoreBuilder.build do |store|
      store.with_current_user(current_user)
    end

    render :show
  end
end
