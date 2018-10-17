# frozen_string_literal: true

class PhotoSerializer < ApplicationSerializer
  belongs_to :owner
  has_many :tags

  attributes :caption
  attributes :height
  attributes :width
  attributes :url

  def url
    object.image.url
  end
end
