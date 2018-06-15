lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'jekyll-collection-merger/version'

Gem::Specification.new do |s|
  s.name        = 'jekyll-collection-merger'
  s.version     = Jekyll::CollectionMerger::VERSION
  s.licenses    = ['BSD-3']
  s.summary     = "Combines collections and attaches the resulting array of docs to the site's config object."
  s.authors     = ["Ample"]
  s.email       = 'sean@helloample.com'
  s.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  s.require_paths = ["lib"]
  s.add_dependency 'jekyll'
  s.add_dependency 'activesupport'
end