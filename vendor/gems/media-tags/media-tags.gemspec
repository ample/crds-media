lib = File.expand_path('./lib', __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'media-tags/version'

Gem::Specification.new do |s|
  s.name        = 'media-tags'
  s.version     = Jekyll::MediaTags::VERSION
  s.licenses    = ['BSD-3']
  s.summary     = "Dynamically builds pages for media tags"
  s.authors     = ["Ample"]
  s.email       = 'sean@helloample.com'
  s.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  s.require_paths = ["lib"]

  s.add_dependency 'jekyll'
end