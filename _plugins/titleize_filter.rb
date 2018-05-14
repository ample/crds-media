module Jekyll
  module Titleize
    def titleize(words)
      return words.titleize
    end
  end
end

Liquid::Template.register_filter(Jekyll::Titleize)
