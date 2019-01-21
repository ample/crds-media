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
gem 'wdm', '~> 0.1.0', platforms: [:mingw, :mswin, :x64_mingw]

gem 'dotenv'

# For uploading to Monetate SFTP
gem 'net-sftp'

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
  gem 'jekyll-sitemap'
  gem 'jekyll-contentful', git: 'https://github.com/crdschurch/jekyll-contentful', tag: '1.2.0'
  # gem 'jekyll-contentful', '~> 1.0', path: File.expand_path('../jekyll-contentful', __dir__)
  gem 'jekyll-asset-pipeline', git: 'https://github.com/crdschurch/jekyll-asset-pipeline', tag: '0.0.2'
  # gem 'jekyll-asset-pipeline', path: File.expand_path('../jekyll-asset-pipeline', __dir__)
  gem 'jekyll-redirect-from'
  gem 'jekyll-feed', '~> 0.6'
  gem 'jekyll-crds', git: 'https://github.com/crdschurch/jekyll-crds.git', tag: '0.0.1'

  gem "jekyll-cloudsearch", git: 'https://github.com/crdschurch/jekyll-cloudsearch', tag: '0.3.0'
  #gem 'jekyll-cloudsearch', path: File.expand_path('../jekyll-cloudsearch', __dir__)

  gem 'jekyll-placeholders', '~> 0.0', git: 'https://github.com/ample/jekyll-placeholders.git'
  gem 'jekyll-coffeescript'
  gem 'paging-mister-hyde', '~> 0.2', git: 'https://github.com/ample/paging-mister-hyde.git'
  gem 'video-tags', '~> 0.0.1', path: File.expand_path('./vendor/gems/video-tags', __dir__)
end
