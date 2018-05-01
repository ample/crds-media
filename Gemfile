source "https://rubygems.org"

gem "jekyll", "~> 3.7.2"

group :development do
  gem "pry"
end

group :jekyll_plugins do
  # gem "jekyll-contentful", "~> 0.0.1", path: File.join(File.dirname(__FILE__), "../jekyll-contentful")
  gem "jekyll-contentful", "~> 0.0.1", git: 'https://github.com/crdschurch/jekyll-contentful.git'
  gem "jekyll-feed", "~> 0.6"
  gem 'jekyll-redirect-from'
  gem 'jekyll-paginate-v2'
  gem 'jekyll-assets'

  gem 'bootstrap-sass', '~> 3.3.7'
  # gem 'crds-styles', path: File.expand_path('../crds-styles', __dir__)
  gem 'crds-styles', github: 'crdschurch/crds-styles', branch: 'feature/US13259-audit-assets'
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
