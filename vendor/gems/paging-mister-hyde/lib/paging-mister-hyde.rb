require 'jekyll'
require 'paging-mister-hyde/version'

class PagingMisterHyde < Jekyll::Generator
  attr_accessor :site

  def generate(site)
    site.pages.
      select{|page| page.data.dig('paginate') }.
      map do |manifest|
        cfg = manifest.data.dig('paginate')
        cfg.keys.map do |content_type|
          collections = site.collections[content_type].docs.each_slice(cfg.dig(content_type, 'per')).to_a
          manifest.data[content_type] = collections.first

          collections[1..collections.count].each_with_index do |docs, i|
            basename = File.basename(manifest.instance_variable_get('@path'), '.*')
            page = Jekyll::Page.new(site, manifest.instance_variable_get('@base'), manifest.instance_variable_get('@dir'), File.basename(manifest.instance_variable_get('@path')))
            page.instance_variable_set('@url', "/#{basename}/page/#{i+2}/index.html")
            page.data[content_type] = docs

            # binding.pry
            site.pages << page
          end
        end
      end
  end
end