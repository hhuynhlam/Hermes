# frozen_string_literal: true

Mongoid.load_configuration(
  clients: {
    default: {
      uri: Settings.mongoid.uri
    }
  }
)
