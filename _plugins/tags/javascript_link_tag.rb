module Jekyll
  class JavascriptLinkTag < Liquid::Tag

    include LiquidExtensions

    def initialize(tag_name, filename, tokens)
      super
      @filename = filename
    end

    def render(context)
      site = Jekyll.sites.first
      filename = lookup_variable(context, @filename.strip)
      file_path = "/#{site.config['asset_dest']}/#{filename.strip}-#{site.config['asset_hash']}.js"
      "<script async type=\"text/javascript\" src=\"#{file_path}\"></script>"
    end

  end
end

Liquid::Template.register_tag('javascript_link_tag', Jekyll::JavascriptLinkTag)
