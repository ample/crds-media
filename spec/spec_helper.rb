require 'rspec'
require 'jekyll'
require 'jekyll-crds'
require 'jekyll-placeholders'
require 'video-tags'

require 'pry'
require 'vcr'

require_relative './support/jekyll_helper'

RSpec.configure do |config|
end

VCR.configure do |config|
  config.cassette_library_dir = "spec/vcr"
  config.hook_into :webmock
end