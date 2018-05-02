lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'jekyll-crds/version'

Gem::Specification.new do |s|
  s.name        = 'jekyll-crds'
  s.version     = Jekyll::Crds::VERSION
  s.licenses    = ['BSD-3']
  s.summary     = "Jekyll integration for Crossroads"
  s.authors     = ["Ample"]
  s.email       = 'taylor@helloample.com'
  s.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  s.require_paths = ["lib"]
  s.add_dependency 'jekyll'
  s.add_dependency 'httparty'
end