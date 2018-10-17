# frozen_string_literal: true

flipper_ui = Flipper::UI.app(FEATURE) do |builder|
  builder.use Rack::Auth::Basic do |username, password|
    username == Settings.http_auth.username &&
      password == Settings.http_auth.password
  end
end

single_page_app = { to: 'ui/root#show', defaults: { format: 'html' } }

Rails.application.routes.draw do
  root single_page_app

  get '/health', to: 'health#show'

  # Admin
  mount flipper_ui => '/admin/flipper'
  get '/admin/logout', to: 'admin#logout'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # API
  namespace :api do
    namespace :v1 do
      resources :photos, only: %w[index show create update destroy]
      resources :users, only: %w[index update]
    end
  end

  # Users
  devise_for :users

  # UI
  get '/*path', single_page_app
end
