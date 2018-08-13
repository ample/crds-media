require 'fileutils'

module Jekyll
  module MediaTags
    class PageBuilder

      attr_reader :site, :publishable_media

      def initialize(site)
        @site = site
        init_publishable_media
        generate_pages
      end

      private

        def init_publishable_media
          @publishable_media = []
          content_types = %w{articles videos messages episodes songs}
          content_types.each { |type| @publishable_media.concat(site.collections[type].docs) }
        end

        def generate_pages
          site.collections['tags'].docs.each do |tag|
            page = Jekyll::Page.new(site, site.source, '_layouts', 'tag.html')
            # Customize the URL for the new page.
            page.instance_variable_set('@url', "/tags/#{tag.data['slug']}/index.html")
            # Add default frontmatter to the new page.
            (page.data ||= {}).merge!(
              'slug' => tag.data['slug'],
              'title' => tag.data['title'],
            )
            # Inject the page into the site's pages.
            site.pages << page
            # Run the paginator.
            ::PagingMisterHyde::Paginator.new(site, page)
          end
        end

    end
  end
end
