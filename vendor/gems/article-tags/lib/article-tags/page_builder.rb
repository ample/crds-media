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
              category = map[:category]
              map[:tags].each do |tag|
                site.config['article_filters'] << {
                  'title' => tag['title'],
                  'slug' => "#{category['slug']}+#{tag['slug']}",
                  'tag_title' => tag['title'],
                  'tag_slug' => tag['slug'],
                  'category_title' => category['title'],
                  'category_slug' => category['slug'],
                  'url' => "/articles/filters/#{category['slug']}+#{tag['slug']}"
                }
              end
            end
          rescue NoMethodError => e
            site.config['article_filters'] = []
          end
        end

        def generate_pages
          # For each article tag, build out a corresponding page using the article_tag
          # layout.
          site.config['article_filters'].each do |tag|
            page = Jekyll::Page.new(site, site.source, '_layouts', 'article_filter.html')
            # Customize the URL for the new page.
            page.instance_variable_set('@url', "#{tag['url']}/index.html")
            # Add default frontmatter to the new page.
            page.data = (page.data ||= {}).merge!(tag).merge!(
              'layout' => 'default'
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
