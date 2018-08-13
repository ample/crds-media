module Jekyll
  module MediaTags
    class Generator < Jekyll::Generator
      attr_accessor :site

      def generate(site)
        Jekyll::MediaTags::PageBuilder.new(site)
      end

    end
  end
end