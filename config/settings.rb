# frozen_string_literal: true

class Settings
  extend Mixlib::Config

  require 'dotenv/load' if ENV['RAILS_ENV'] == 'development'

  config_context :aws do
    default(:access_key_id, ENV['AWS_ACCESS_KEY_ID'])
    default(:secret_access_key, ENV['AWS_SECRET_ACCESS_KEY'])

    default(:s3_bucket, ENV['AWS_S3_BUCKET'])
    default(:s3_host_alias, ENV['AWS_S3_HOST_ALIAS'])
    default(:s3_region, ENV['AWS_S3_REGION'])
  end

  config_context :http_auth do
    default(:username, ENV['HTTP_AUTH_USERNAME'] || 'sf')
    default(:password, ENV['HTTP_AUTH_PASSWORD'] || '49ers')
  end

  config_context :mongoid do
    default(:uri, ENV['MONGO_URL'])
  end
end
