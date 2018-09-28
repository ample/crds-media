source 'https://rubygems.org'

# ---------------------------------------- | Base

gem 'jekyll', '~> 3.7.2'

# ---------------------------------------- | Utilities

gem 'activesupport'
gem 'hashie'
gem 'uglifier'

# To fix security vulnerability
gem 'sprockets', '~> 3.7.2'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem 'wdm', '~> 0.1.0' if Gem.win_platform?

gem 'dotenv'

group :development do
  gem 'pry'
  gem 'pry-nav'
end

# ---------------------------------------- | Testing

group :test do
  gem 'rspec'
  gem 'guard-rspec'
  gem 'launchy'
end

# ---------------------------------------- | Plugins

group :jekyll_plugins do
  gem 'jekyll-assets'
  gem 'jekyll-redirect-from'
  gem 'jekyll-contentful', '~> 0.0.1', git: 'https://github.com/crdschurch/jekyll-contentful.git', branch: '0.0.10'
  gem 'jekyll-feed', '~> 0.6'
  gem 'jekyll-crds', git: 'https://github.com/crdschurch/jekyll-crds.git', tag: '0.0.2'
  gem 'jekyll-cloudsearch', '~> 0.0.1', git: 'https://github.com/crdschurch/jekyll-cloudsearch.git'
  gem 'jekyll-placeholders', '~> 0.0.1', git: 'https://github.com/ample/jekyll-placeholders.git'
  gem 'paging-mister-hyde', '~> 0.0', git: 'https://github.com/ample/paging-mister-hyde.git'
  gem 'video-tags', '~> 0.0.1', path: File.expand_path('./vendor/gems/video-tags', __dir__)

  # Must be loaded after jekyll-assets, otherwise the assets won't be discoverable.
  gem 'crds-styles', '~> 3.0.0', git: 'https://github.com/crdschurch/crds-styles.git', branch: 'development'
end
