module Jekyll
  class DiscussionGenerator < Generator

    def generate(site)
      # Global references to docs within Jekyll.
      all_questions = site.collections['discussion_questions'].docs
      %w{articles messages}.each do |collection_name|
        # Cycle through each collection type.
        site.collections[collection_name].docs.each do |doc|
          # Find discussion questions array
          doc_questions = doc.data.dig('discussion', 'raw', 'fields', 'discussion_questions') || []
          # Find ID for each discussion question
          doc_question_ids = doc_questions.collect { |q| q['sys']['id'] }
          # Match discussion question ID to discussion_questions collection entries.
          doc.data['discussion_questions'] = all_questions.select { |q| doc_question_ids.include?(q.data['id']) }
        end
      end
    end
  end
end
