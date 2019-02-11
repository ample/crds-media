require 'fileutils'

module Jekyll
  module ArticleTags
    class PageBuilder

      attr_reader :site

      def initialize(site)
        @site = site
        init_tags
        generate_pages
      end

      private

        def tags_from_articles_in_category(category_id)
          site.collections['articles'].docs.select { |a| a.data.dig('category', 'id') == category_id }
            .flat_map { |a| a.data['tags'] }.uniq
        end

        def init_tags
          begin
            tag_map = site.collections['categories'].docs.map { |category|
              {
                category: category.data,
                tags: category.data['tags'] & tags_from_articles_in_category(category.data['id'])
              }
            }

            site.config['article_filters'] = []

            tag_map.each do |map|
              map[:tags].each do |tag|
                site.config['article_filters'] << {
                  'title' => tag['title'],
                  'slug' => tag['slug'],
                  'url' => "/articles/filters/#{map[:category]['slug']}+#{tag['slug']}"
                }
              end
            end
            binding.pry
          rescue NoMethodError => e
            site.config['article_filters'] = []
          end
        end

        def generate_pages
          # For each article tag, build out a corresponding page using the article_tag
          # layout.
          featureable_tags.each do |tag|
            page = Jekyll::Page.new(site, site.source, '_layouts', 'article_tag.html')
            # Customize the URL for the new page.
            page.instance_variable_set('@url', "/articles/tags/#{tag.data['slug']}/index.html")
            # Add default frontmatter to the new page.
            (page.data ||= {}).merge!(
              'layout' => 'default',
              'slug' => tag.data['slug'],
              'title' => tag.data['title']
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
