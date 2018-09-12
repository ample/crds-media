module Jekyll
  class SubtopicsGenerator < Jekyll::Generator

    def generate(site)
      # Global references to docs within Jekyll.
      all_docs = site.collections.values.collect(&:docs).flatten
      all_tags = site.collections['tags'].docs
      all_topics = site.collections['topics'].docs
      # Loop through each topic doc.
      all_topics.each do |topic|
        # Get all docs that have applied this topic.
        topic_docs = all_docs.select { |d| d.data['topic'] == topic.data['title'] }
        # Create a reference to publishable docs within this topic. Docs that
        # have a `date` field (mapped through jekyll-contentful) are considered
        # publishable.
        topic_media = topic_docs.select { |d| d.data['date'] }
        # Publishable docs should be sorted in reverse chronological order.
        topic_media.sort_by! { |d| d.data['date'] }.reverse!
        # Set the featured_media on the topic to the most recent three
        # publishable docs.
        topic.data['featured_media'] = topic_media.first(3)
        # Look through all the topic's associated docs to find all tags used
        # within this topic.
        tag_names = topic_docs.collect { |d| d.data['tags'] }.flatten.uniq
        # Use the topic's tag names to collect the Jekyll docs representing the
        # associated tags.
        topic_tags = all_tags.select { |t| tag_names.include?(t.data['title']) }
        # Sort tags by (case-insensitive) title.
        topic_tags.sort_by! { |t| t.data['title'].downcase }
        # Set the tags on the topic to the sorted list of tags used within the
        # topic.
        topic.data['tags'] = topic_tags
        # Reference to an array of `id` fields of tags featured on the topic.
        # This comes through as nil if it hasn't been set in Contentful, which
        # is why we need to fall back to an empty array.
        featured_tag_ids = topic.data['featured_tag_ids'] || []
        # Featured tags are found using the featured_tag_ids array to extract
        # featured from the topic_tags array. Thus, if a tag is set in
        # Contentful that doesn't belong in this topic, it is ignored.
        featured_tags = topic_tags.select { |t| featured_tag_ids.include?(t.data['id']) }
        # Featured tags are sorted by the order from which they came in from
        # Contentful.
        featured_tags.sort_by! { |t| featured_tag_ids.index(t.data['id']) }
        # Set the topic's featured_tag_data by looping through the featured_tags
        # array and storing a reference to the tag and to the media which has
        # applied the tag and this topic.
        topic.data['featured_tag_data'] = featured_tags.map do |tag|
          media = topic_media.select { |t| t.data['tags'].include?(tag.data['title']) }
          { 'tag' => tag, 'media' => media }
        end
      end

      # binding.pry

      topic_height = 78
      tag_height = 24

      total_height = (all_topics.size * topic_height) + (all_topics.collect { |t| t.data['tags'] }.flatten.size * tag_height)
      max_col_height = (total_height * 0.35).floor

      current_col = 0
      current_col_height = 0
      grid = []

      all_topics.each do |topic|
        current_col_height += topic_height + (topic.data['tags'].size * tag_height)

        if current_col < 2 && current_col_height > max_col_height
          current_col += 1
          current_col_height = 0
        end

        grid[current_col] ||= []
        grid[current_col] << topic
      end

      site.config['topics_grid'] = grid

      # def topic_height(topic)
      #   topic_height + (topic.data['tags'].size * tag_height)
      # end
    end

  end
end
