module Jekyll
  class JavascriptLinkTag < Liquid::Tag

    def initialize(tag_name, filename, tokens)
      super
      site = Jekyll.sites.first
      dest = site.config.dig('assets', 'destination') || 'assets'
      @file_path = "#{site.config['destination']}/#{dest}/#{filename.strip}"
    end

    def render(context)
      "<script async type=\"text/javascript\" src=\"#{@file_path}\"></script>"
    end

  end
end

Liquid::Template.register_tag('javascript_link_tag', Jekyll::JavascriptLinkTag)
