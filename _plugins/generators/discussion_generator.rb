module Jekyll
  class DiscussionGenerator < Generator

    def generate(site)
      # Global reference collecting all objects in discussion collection.
      all_discussions = site.collections['discussions'].docs
      %w{articles messages}.each do |collection_name|
        # Loop through the docs of each defined collection name.
        site.collections[collection_name].docs.each do |doc|
          # Get the ID of the discussion object from a collection doc.
          discussion_id = doc.data['discussion']
          # Find the matching discussion ID in global discussions array and create usable variable for it.
          doc.data['discussion'] = all_discussions.find { |d| d.data['id'] == discussion_id }
        end
      end
    end
  end
end
