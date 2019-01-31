require 'pry'

module Jekyll
  module Related
    def related(obj, site)
      tags = obj['tags'].collect{|a| a['slug']}
      related = []

      unless tags.empty?
        site['articles'].reverse.each do |article|
          if article.id != obj.id
            unless (tags & article['tags'].collect{|a| a['slug']}).empty?
              related.push(article)
            end
          end
          
          break if related.count == 3
        end
      end
      
      related
    end
  end
end

Liquid::Template.register_filter(Jekyll::Related)
