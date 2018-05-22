source "https://rubygems.org"

gem "jekyll", "~> 3.7.2"
gem 'activesupport'

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
  gem "jekyll-crds", "~> 0.0.1", path: File.join(File.dirname(__FILE__), "./vendor/gems/jekyll-crds")
  gem "jekyll-contentful", "~> 0.0.2", git: 'https://github.com/crdschurch/jekyll-contentful.git'
  gem "jekyll-feed", "~> 0.6"
  gem 'jekyll-redirect-from'
  gem 'jekyll-assets'
  # gem 'crds-styles', path: File.expand_path('../crds-styles', __dir__)
  gem 'crds-styles', git: 'https://github.com/crdschurch/crds-styles.git', branch: 'development'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
