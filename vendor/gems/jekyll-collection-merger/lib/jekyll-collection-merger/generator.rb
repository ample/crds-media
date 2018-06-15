module Jekyll
  module CollectionMerger
    class Generator < Jekyll::Generator
      attr_accessor :site

      def generate(site)
        Jekyll::CollectionMerger::Reader.new(site)
      end

    end
  end
end