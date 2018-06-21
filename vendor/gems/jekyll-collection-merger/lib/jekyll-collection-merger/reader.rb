module Jekyll
  module CollectionMerger
    class Reader

      def initialize(site)
        site.config['merged_collections'].each do |name, config|
          Merger.new(site: site, name: name, config: config)
        end
      end

    end
  end
end
