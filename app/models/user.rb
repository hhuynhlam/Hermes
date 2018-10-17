# frozen_string_literal: true

class User
  include Mongoid::Document

  field :address, type: String
  field :first_name, type: String
  field :last_name, type: String
  field :phone, type: Integer

  field :active, type: Boolean, default: true

  ##############################################################################
  # DEVISE
  ##############################################################################

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, and :omniauthable

  # Disable modules: :registerable, :recoverable
  devise :database_authenticatable, :rememberable, :trackable, :validatable

  ## Database authenticatable
  field :email,              type: String, default: ''
  field :encrypted_password, type: String, default: ''

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :current_sign_in_at, type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_at,    type: Time
  field :last_sign_in_ip,    type: String
  field :sign_in_count,      type: Integer, default: 0

  ## Recoverable
  # field :reset_password_token,   type: String
  # field :reset_password_sent_at, type: Time

  ## Confirmable
  # field :confirmation_token,   type: String
  # field :confirmed_at,         type: Time
  # field :confirmation_sent_at, type: Time
  # field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time

  # FIXME: temporary workaround for undefined method error when saving record
  #        in Rails Admin (https://github.com/plataformatec/devise/issues/4542)
  def will_save_change_to_email?
  end
end
