require 'hashie'

module Jekyll
  class DynamicPermalinkGenerator < Generator
    attr_accessor :site

    def generate(site)
      site.collections.each do |type, collection|
        collection.docs.each do |doc|

          tpl = site.config.dig('collections', type, 'permalink')
          placeholders = doc.data.
            select{ |key, value| key.to_s.match(/slug$/) }.
            merge(doc.url_placeholders).
            each_with_object({}){|(k,v), h| h[k.to_sym] = v}

          doc.instance_variable_set('@url', ::Jekyll::URL.new({
            :template     => tpl,
            :placeholders => placeholders
          }).to_s)

        end
      end
    end
  end
end