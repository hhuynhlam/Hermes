# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.3.1'

gem 'rails', '~> 5.2.0'

gem 'active_model_serializers', '~> 0.10.0'
gem 'aws-sdk-s3', '~> 1.21'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'devise', '~> 4.5'
gem 'flipper', '~> 0.16'
gem 'flipper-mongo', '~> 0.16'
gem 'jazz_fingers', '~> 4.0'
gem 'kaminari-actionview', '~> 1.1'
gem 'kaminari-core', '~> 1.1'
gem 'kaminari-mongoid', '~> 1.0'
gem 'mixlib-config', '~> 2.2'
gem 'mongoid', '~> 7.0'
gem 'mongoid-paperclip', '~> 0.0.11'
gem 'paperclip', '~> 6.1'
gem 'pry-rails', '~> 0.3.6'
gem 'puma', '~> 3.11'
gem 'pundit', '~> 2.0'
gem 'rack-cors', require: 'rack/cors'
gem 'react-rails', '~> 2.4'
gem 'sass-rails', '~> 5.0'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker', '~> 3.5'

# Admin
gem 'flipper-ui', '~> 0.16'
gem 'rails_admin', '~> 1.3'

group :development, :test do
  gem 'dotenv-rails'
  gem 'rspec-rails'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rails-erd'
  gem 'rubocop', require: false
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'capybara', '>= 2.15', '< 4.0'
  gem 'chromedriver-helper'
  gem 'mongoid-rspec'
  gem 'rails-controller-testing'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
