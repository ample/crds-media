source "https://rubygems.org"

gem "jekyll", "~> 3.7.2"
gem 'activesupport'
gem 'hashie'

group :development do
  gem 'pry'
  gem 'pry-nav'
end

group :test do
  gem 'rspec'
  gem 'guard-rspec'
  gem 'launchy'
end

group :jekyll_plugins do
  gem "paging-mister-hyde", "~> 0.0.1", path: File.join(File.dirname(__FILE__), "./vendor/gems/paging-mister-hyde")
  gem "jekyll-placeholders", "~> 0.0.1", path: File.join(File.dirname(__FILE__), "./vendor/gems/jekyll-placeholders")
  gem "jekyll-collection-merger", "~> 0.0.1", path: File.join(File.dirname(__FILE__), "./vendor/gems/jekyll-collection-merger")
  gem "video-tags", "~> 0.0.1", path: File.expand_path('./vendor/gems/video-tags', __dir__)
  gem "jekyll-crds", "~> 0.0.1", path: File.join(File.dirname(__FILE__), "./vendor/gems/jekyll-crds")
  gem "jekyll-contentful", "~> 0.0.5", git: 'https://github.com/crdschurch/jekyll-contentful.git'
  gem "jekyll-feed", "~> 0.6"
  gem 'jekyll-redirect-from'
  gem 'jekyll-assets'
  gem 'crds-styles', "~> 3.0.1", git: 'https://github.com/crdschurch/crds-styles.git'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?

# To fix security vulnerability
gem 'sprockets', '~> 3.7.2'
