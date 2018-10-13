# frozen_string_literal: true

class Settings
  extend Mixlib::Config

  require 'dotenv/load' if ENV['RAILS_ENV'] == 'development'

  config_context :http_auth do
    default(:username, ENV['HTTP_AUTH_USERNAME'] || 'sf')
    default(:password, ENV['HTTP_AUTH_PASSWORD'] || '49ers')
  end

  config_context :mongoid do
    default(:uri, ENV['MONGO_URL'])
  end
end
