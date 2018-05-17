require 'jekyll'
require 'paging-mister-hyde/version'

class PagingMisterHyde < Jekyll::Generator
  attr_accessor :site

  def generate(site)
    site.pages.
      select{|page| page.data.dig('paginate') }.
      map do |manifest|

        # Get frontmatter from the current page
        cfg = manifest.data.dig('paginate')
        cfg.keys.map do |content_type|

          # Smack 'em yak 'em slice 'em up into an array of arrays
          per = cfg.dig(content_type, 'per')
          collections = site.collections[content_type].docs.each_slice(per).to_a
          total_pages = collections.count

          # Populate pagination values for the current page /articles.html
          manifest.data[content_type] = {
            "docs" => collections.first,
            "total_pages" => total_pages,
            "page" => 1,
            "previous_page" => previous_page_number(1),
            "next_page" => next_page_number(1, total_pages)
          }

          # For each group, snoop a loop
          collections.each_with_index do |docs, i|

            # Set some things
            page_num = (i + 1)
            base = manifest.instance_variable_get('@base')
            dir = manifest.instance_variable_get('@dir')
            path = File.basename(manifest.instance_variable_get('@path'))
            path_sans_ext = File.basename(manifest.instance_variable_get('@path'), '.*')

            # Create a new page, set its URL to a paginable path
            page = Jekyll::Page.new(site, base, dir, path)
            page.instance_variable_set('@url', "/#{path_sans_ext}/page/#{page_num}/index.html")

            # Populate pagination values for the new page
            page.data[content_type] = {
              "total_pages" => total_pages,
              "docs" => docs,
              "page" => page_num,
              "previous_page" => previous_page_number(page_num),
              "next_page" => next_page_number(page_num, total_pages)
            }

            # Shovel the page
            site.pages << page
          end
        end
      end
  end

  protected

    def previous_page_number(n)
      n > 1 ? n - 1 : false
    end

    def next_page_number(n, total)
      n < total ? n + 1 : false
    end

end