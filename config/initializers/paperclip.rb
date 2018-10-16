# frozen_string_literal: true

Paperclip::Attachment.default_options[:storage] = :s3
Paperclip::Attachment.default_options[:path] = ':attachment/:id/:style.:extension'
Paperclip::Attachment.default_options[:url] = ':s3_alias_url'

Paperclip::Attachment.default_options[:bucket] = Settings.aws.s3_bucket
Paperclip::Attachment.default_options[:s3_host_alias] = Settings.aws.s3_host_alias
Paperclip::Attachment.default_options[:s3_credentials] = {
  access_key_id: Settings.aws.access_key_id,
  secret_access_key: Settings.aws.secret_access_key,
  s3_region: Settings.aws.s3_region
}
Paperclip::Attachment.default_options[:s3_protocol] = 'https'

# https://github.com/thoughtbot/paperclip/issues/2575
# https://github.com/thoughtbot/paperclip/wiki/Attachment-downloaded-from-a-URL
Paperclip::UriAdapter.register
Paperclip::DataUriAdapter.register
