# frozen_string_literal: true

class Ui::StoreBuilder < ApplicationBuilder
  def default
    {
      data: {
        photos: {},
        users: {}
      },
      profile: {
        currentUser: nil
      }
    }.with_indifferent_access
  end

  def with_current_user(user)
    user_id = user.id.to_s

    @output[:profile][:currentUser] = user_id
    @output[:data][:users][user_id] =
      ActiveModelSerializers::SerializableResource.new(user, {}).as_json[:data]
  end
end
