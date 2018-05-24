module PagingMisterHyde
  class Paginator

    attr_accessor :cfg, :page, :site

    def initialize(site, page)
      @site = site
      @page = page
      @cfg = page.data.dig('paginate')

      @cfg.keys.map do |type|
        offset_collection(type)
        pages = paginated_collection(type)
        decorate_page(@page, type, 1, pages.count, pages.first)
        paginate(type, pages)
      end
    end

    # For every collection in frontmatter
    # decorate the page with params needed in _pagination.html
    def decorate_page(page, type, page_num, total_pages, docs)
      attrs = {
        "docs" => docs,
        "total_pages" => total_pages,
        "page" => page_num,
        "previous_page" => previous_page_number(page_num),
        "next_page" => next_page_number(page_num, total_pages)
      }
      if page.data.keys.include?(type)
        page.data[type].merge!(attrs)
      else
        page.data[type] = attrs
      end
    end

    def paginate(type, collection)
      total_pages = collection.count

      # For each collection of docs...
      collection[1..collection.count].each_with_index do |docs, i|

        # Set some things
        page_num = (i + 2)
        base = @page.instance_variable_get('@base')
        dir = @page.instance_variable_get('@dir')
        path = File.basename(@page.instance_variable_get('@path'))
        path_sans_ext = File.basename(@page.instance_variable_get('@path'), '.*')

        # Create a new page, set its URL to a paginable path
        page = Jekyll::Page.new(@site, base, dir, path)
        page.instance_variable_set('@url', "/#{path_sans_ext}/page/#{page_num}/index.html")
        decorate_page(page, type, page_num, total_pages, docs)

        # Shovel the page
        @site.pages << page
      end
    end

    protected

      def offset_collection(type)
        if n = @cfg.dig(type, 'offset')
          @page.data[type] = { "offset" => sorted_collection(type).take(n).to_a }
        end
      end

      def paginated_collection(type)
        collection = sorted_collection(type)
        per = @cfg.dig(type, 'per')
        offset = @cfg.dig(type, 'offset') || 0
        collection.drop(offset).each_slice(per).to_a
      end

      def sorted_collection(type)
        collection = @site.collections[type].docs
        if @cfg.dig(type, 'sort')
          sort_by, sort_in = @cfg.dig(type, 'sort') ? @cfg.dig(type, 'sort').split(' ') : nil
          collection.sort_by! { |d| d.data[sort_by] } if sort_by
          collection.reverse! if sort_in == 'desc'
        end
        collection
      end

      def previous_page_number(n)
        n > 1 ? n - 1 : false
      end

      def next_page_number(n, total)
        n < total ? n + 1 : false
      end
  end
end