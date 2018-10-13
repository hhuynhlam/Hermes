# frozen_string_literal: true

require 'rails_admin/adapters/active_record'
require 'rails_admin/adapters/mongoid'

RailsAdmin.config do |config|
  config.authorize_with do
    authenticate_or_request_with_http_basic('Login') do |username, password|
      username == Settings.http_auth.username &&
        password == Settings.http_auth.password
    end
  end

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    # export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.included_models = %w[User]

  config.model 'User' do
    edit do
      %i[
        address
        first_name
        last_name
        email
        password
        password_confirmation
      ].map { |field_name| field field_name }
    end

    list do
      %i[
        password
        password_confirmation
      ].map do |field_name|
        configure field_name do
          filterable false
          hide
        end
      end
    end
  end
end
