module Jekyll
  class SubtopicGenerator < Jekyll::Generator

    def generate(site)
      docs = site.collections.values.collect(&:docs).flatten
      site.collections['topics'].docs.each do |topic|
        tag_names = docs
          .select { |d| d.data['topic'] == topic.data['title'] }
          .collect { |d| d.data['tags'] }.flatten.uniq
        topic.data['tags'] = site.collections['tags'].docs
          .select { |t| tag_names.include?(t.data['title']) }
          .sort_by { |t| t.data['title'] }
      end
    end

  end
end
