# frozen_string_literal: true

class ApplicationBuilder
  attr_reader :output

  def self.build
    builder = new
    yield(builder)
    builder.output
  end

  def initialize
    @output = default
  end

  def default
    {}
  end
end
