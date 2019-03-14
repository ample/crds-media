module Jekyll
  class CollectedDocumentsGenerator < Jekyll::Generator

    def generate(site)
      doc_types = %w[article episode message song video]
      collectable_docs = site.documents.select{ |d| doc_types.include?(d.data['content_type']) }
      all_featured_media = site.collections['featured_media'].docs
      site.collections['collections'].docs.each do |collection|
        # Get all docs that have applied this collection.
        collected_docs = []
        collectable_docs.each do |collectable_doc|
          collection_ids = collectable_doc.data['collections'].to_a.collect{ |c| c['id'] }
          collected_docs << collectable_doc if collection_ids.include?(collection.data['id'])
        end
        # Create a reference to publishable docs within this collection.
        # Docs that have a `published_at` field are considered publishable.
        collection_media = collected_docs.select { |d| d.data['published_at'] }
        # Publishable docs should be sorted in reverse chronological order.
        collection_media.sort_by! { |d| d.data['published_at'] }.reverse!



        # Get all docs that are featured for this collection, based on URL
        permalink = "/collections/#{collection.data['slug']}"
        features = all_featured_media.select { |m| m['page_path'] == collection.url}
        if features.size > 0
          # IDs of the entries attached to the feature in Contentful.
          doc_ids = features.first.data['entries'] ? features.first.data['entries'].collect { |e| e['id'] } : []
          # Using the IDs, select the doc objects from the site and maintain the
          # sort order of the doc_ids.
          featured_docs = collectable_docs.select { |d| doc_ids.include?(d.data['id']) }.sort_by { |d| doc_ids.index(d.data['id']) }
        end

        # TODO: if less than 7 featured items, shift from collected_media
        # ensuring no repeats

        collection.data['featured_media'] = featured_docs
        collection.data['collection_media'] = collection_media
      end
    end
  end
end
