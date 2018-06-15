require 'active_support/core_ext/object/blank'
require 'active_support/core_ext/hash/keys'

module Jekyll
  module CollectionMerger
    class Merger

      attr_reader :site, :name, :config

      def initialize(options = {})
        process_options(options)
        site.config[name] = []
        merge_docs
        sort_docs if config['sort'].present?
      end

      private

      def merge_docs
        config['merge'].each do |collection_name|
          site.config[name] << site.collections[collection_name].docs
        end
        site.config[name].flatten!
      end

      def sort_docs
        return false unless config['sort'].present?

        sort_by = config['sort'].split(' ').first
        site.config[name].sort_by! { |d| d.data[sort_by] }

        reverse = config['sort'].split(' ')[1] == 'desc'
        site.config[name].reverse! if reverse
      end

      def process_options(options = {})
        %i[site name config].each do |x|
          instance_variable_set("@#{x}", options[x])
          raise ArgumentError.new("Missing required option: #{x}") if options[x].blank?
        end
      end

    end
  end
end
