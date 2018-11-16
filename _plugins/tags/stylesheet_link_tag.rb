module Jekyll
  class StylesheetLinkTag < Liquid::Tag

    def initialize(tag_name, filename, tokens)
      super
      site = Jekyll.sites.first
      dest = site.config.dig('assets', 'destination') || 'assets'
      @file_path = "#{site.config['destination']}/#{dest}/#{filename.strip}"
    end

    def render(context)
      "<link href=\"#{@file_path}\" rel=\"stylesheet\">"
    end

  end
end

Liquid::Template.register_tag('stylesheet_link_tag', Jekyll::StylesheetLinkTag)
