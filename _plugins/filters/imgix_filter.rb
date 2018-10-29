module Jekyll
  module ImgixFilter
    def imgix(url, cfg = nil)
      cfg ||= site.config['imgix']
      url.sub(/#{cfg.dig(:find)}/, cfg.dig(:replace))
    rescue
      url
    end
  end
end

Liquid::Template.register_filter(Jekyll::ImgixFilter)