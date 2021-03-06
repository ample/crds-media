require 'active_support/all'

module Jekyll
  module MetaFilters

    def meta_title(page)
      return page['meta']['title'] if page.to_h.dig('meta', 'title').present?
      page_title = page['title']
      site_title = site.config['title']
      return "#{escape(page_title)} | #{escape(site_title)}" if page_title && page_title != site_title
      escape(site_title)
    end

    def meta_description(page)
      return page['meta']['description'] if page.to_h.dig('meta', 'description').present?
      attrs = %w{lead description body}
      desc = attrs.map { |a| page[a].try(:strip) }.reject(&:blank?).first || site.config['description']
      html = markdownify(desc)
      text = strip_html(html).remove("\n")
      truncate(text, 160)
    end

    def meta_image(page)
      return "https:#{page['meta']['image']['url']}" if page.to_h.dig('meta', 'image', 'url').present?
      image_url = imgix(page.to_h.dig('image', 'url')) || site.config['image']
      "https:#{escape(image_url)}"
    end

  end
end

Liquid::Template.register_filter(Jekyll::MetaFilters)
