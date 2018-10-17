# frozen_string_literal: true

class Photo < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Paperclip

  before_save :extract_dimensions

  CONTENT_TYPE = %w[
    image/gif
    image/jpeg
    image/jpg
    image/png
  ].freeze

  belongs_to :owner, class_name: 'User'
  has_and_belongs_to_many :tags, class_name: 'User'
  has_mongoid_attached_file :image

  field :caption, type: String
  field :height, type: Integer
  field :width, type: Integer

  validates_attachment_content_type :image, content_type: CONTENT_TYPE
  validates :image, presence: true

  private

  def extract_dimensions
    return unless CONTENT_TYPE.include?(image_content_type)

    # only extract dimenions after resize operations to account for auto-orientation
    file = image.queued_for_write[:original]
    return if file.nil?

    geometry = Paperclip::Geometry.from_file(file)
    self.height = geometry.height.to_i
    self.width = geometry.width.to_i
  end
end
