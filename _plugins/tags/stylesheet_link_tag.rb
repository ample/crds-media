module Jekyll
  class StylesheetLinkTag < Liquid::Tag

    include LiquidExtensions

    def initialize(tag_name, filename, tokens)
      super
      @filename = filename
    end

    def render(context)
      site = Jekyll.sites.first
      filename = lookup_variable(context, @filename.strip)
      file_path = "/#{site.config['asset_dest']}/#{filename.strip}-#{site.config['asset_hash']}.css"
      "<link href=\"#{file_path}\" rel=\"stylesheet\">"
    end

  end
end

Liquid::Template.register_tag('stylesheet_link_tag', Jekyll::StylesheetLinkTag)
