module Jekyll
  class CollectionMergerGenerator < Generator

    def generate(site)
      site.config['merged_collections'].each do |name, config|

        site.config[name] = []

        config['merge'].each do |collection_name|
          site.config[name] << site.collections[collection_name].docs
        end

        site.config[name].flatten!

        next unless config['sort']

        sort_by = config['sort'].split(' ').first
        site.config[name].sort_by! { |d| d.data[sort_by] }

        reverse = config['sort'].split(' ')[1] == 'desc'
        site.config[name].reverse! if reverse
        # binding.pry
      end
    end

  end
end
