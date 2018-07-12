require 'fileutils'

module Jekyll
  module VideoTags
    class PageBuilder

      attr_reader :site, :tag_names

      def initialize(site)
        @site = site
        init_tags
        generate_pages
      end

      private

        def init_tags
          begin
            # Gather an array of tag names from the video collection docs.
            @tag_names = site.collections['videos'].docs.collect { |d| d.data['title'] }

            # Inject video_tags into the site's config so they can be iterated
            # upon. Specifically, this enables us to build the video nav without
            # extra effort.
            site.config['video_tags'] = []
            tag_names.each do |name|
              site.config['video_tags'] << {
                'title' => name,
                'slug' => name.parameterize,
                'url' => "/videos/tags/#{name.parameterize}"
              }
            end
          rescue NoMethodError
            @tag_names = []
            site.config['video_tags'] = []
          end
        end

        def generate_pages
          # For each video tag, build out a corresponding page using the video_tag
          # layout.
          tag_names.each do |name|
            page = Jekyll::Page.new(site, site.source, '_layouts', 'video_tag.html')
            # Customize the URL for the new page.
            page.instance_variable_set('@url', "/videos/tags/#{name.parameterize}/index.html")
            # Add default frontmatter to the new page.
            (page.data ||= {}).merge!(
              'layout' => 'default',
              'slug' => name.parameterize,
              'title' => name
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
