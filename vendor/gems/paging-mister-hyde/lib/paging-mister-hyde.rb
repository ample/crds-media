require 'jekyll'
require 'paging-mister-hyde/version'

class PagingMisterHyde < Jekyll::Generator
  attr_accessor :site

  def generate(site)
    binding.pry
  end
end