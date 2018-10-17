# frozen_string_literal: true

class PhotoSerializer < ApplicationSerializer
  attributes :url

  def url
    object.image.url
  end
end
