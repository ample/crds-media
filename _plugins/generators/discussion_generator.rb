module Jekyll
  class DiscussionGenerator < Generator

    def generate(site)
      # Global references to docs within Jekyll.
      all_docs = site.collections.values.collect(&:docs).flatten
      all_articles = site.collections['articles'].docs
      all_questions = site.collections['discussion_questions'].docs
      # Cycle through each of the articles in the sites' articles collection.
      all_articles.each do |article|
        # Find discussion questions
        article_questions = article.data.dig('discussion', 'raw', 'fields', 'discussion_questions') || []
        # binding.pry
        article_question_ids = article_questions.collect { |q| q['sys']['id'] }
        article.data['discussion_questions'] = all_questions.select { |q| article_question_ids.include?(q.data['id']) }
      end
    end

    # Loop through all the discussion questions in each article and pull out the id
    # Then I need to match that id value to the id present in the discussion_questions collection

  end
end
