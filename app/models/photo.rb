# frozen_string_literal: true

class Photo
  include Mongoid::Document
  include Mongoid::Paperclip

  belongs_to :owner, class_name: 'User'
  has_and_belongs_to_many :tags, class_name: 'User'
  has_mongoid_attached_file :image

  validates_attachment_content_type :image, content_type: %w[
    image/gif
    image/jpeg
    image/jpg
    image/png
  ]
end
