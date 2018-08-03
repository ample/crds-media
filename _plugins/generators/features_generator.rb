module Jekyll
  class FeaturesGenerator < Generator

    def generate(site)
      # All docs for the site.
      docs = site.collections.values.collect(&:docs).flatten
      # Cycle through each of the features in the sites' features collection.
      site.collections['features'].docs.each do |feature|
        # IDs of the entries attached to the feature in Contentful.
        doc_ids = feature.data['doc_ids']
        # Using the IDs, select the doc objects from the site.
        docs = docs.select { |d| doc_ids.include?(d.data['id']) }
        # Set the doc objects to the `docs` data attribute for the feature.
        feature.data['docs'] = docs
      end
    end

  end
end
