source "https://rubygems.org"

gem "jekyll", "~> 3.7.2"
gem "pry"
gem "dotenv"
gem "hubspot-ruby", "~> 0.4.0", git: "https://github.com/ample/hubspot-ruby.git"

group :jekyll_plugins do
  #gem "jekyll-hubspot", "~> 0.0.1", path: File.join(File.dirname(__FILE__), "../jekyll-hubspot")
  gem "jekyll-hubspot", "~> 0.0.1", git: 'https://github.com/crdschurch/jekyll-hubspot.git'
  gem "jekyll-feed", "~> 0.6"
  gem 'jekyll-redirect-from'
  gem 'jekyll-paginate'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?
