# frozen_string_literal: true

require 'flipper'
require 'flipper/adapters/mongo'

collection = Mongo::Client.new(Settings.mongoid.uri)['flipper']
adapter = Flipper::Adapters::Mongo.new(collection)

FEATURE = Flipper.new(adapter)
