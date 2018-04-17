module Jekyll
  module ImgixFilter
    def imgix(url, cfg)
      url.sub(/#{cfg.dig(:find)}/, cfg.dig(:replace))
    end
  end
end

Liquid::Template.register_filter(Jekyll::ImgixFilter)