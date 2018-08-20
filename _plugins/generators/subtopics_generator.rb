module Jekyll
  class SubtopicsGenerator < Jekyll::Generator

    def generate(site)
      # All documents in the Jekyll site.
      all_docs = site.collections.values.collect(&:docs).flatten
      # Loop through each topic doc.
      site.collections['topics'].docs.each do |topic|
        # Get all docs that have applied this topic.
        docs = all_docs.select { |d| d.data['topic'] == topic.data['title'] }
        # Collect any docs that have a date field (mapped through
        # jekyll-contentful), sort by that field, and apply them to the topic.
        topic_media = docs
          .select { |d| d.data['date'] }.sort_by { |d| d.data['date'] }.reverse
        topic.data['featured_media'] = topic_media.first(3)
        # Use the associated docs to collect all tag names for the topic.
        tag_names = docs.collect { |d| d.data['tags'] }.flatten.uniq
        # Use the tag names to collect the Jekyll docs representing the
        # associated tags.
        topic.data['tags'] = site.collections['tags'].docs
          .select { |t| tag_names.include?(t.data['title']) }
          .sort_by { |t| t.data['title'].downcase }
        # Pull out the featured tags into their own attribute.
        # featured_tag_ids = topic.data['featured_tag_ids'] || []
        # topic.data['featured_tags'] = topic.data['tags']
        #   .select { |t| featured_tag_ids.include?(t.data['id']) }
        #   .sort_by { |t| featured_tag_ids.index(t.data['id']) }

        topic.data['featured_tags'] = []
        featured_tag_ids = topic.data['featured_tag_ids'] || []
        featured_tags = topic.data['tags']
          .select { |t| featured_tag_ids.include?(t.data['id']) }
          .sort_by { |t| featured_tag_ids.index(t.data['id']) }
        featured_tags.each do |tag|
          media = topic_media.select { |t| t.data['tags'].include?(tag.data['title']) }
          topic.data['featured_tags'].push({ 'tag' => tag, 'media' => media })
        end
      end
    end

  end
end
