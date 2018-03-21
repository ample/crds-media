require 'pry'
require 'jekyll'

module Jekyll

  class HubspotPost < Document
    def draft?
      false
    end
  end

  class HubspotGenerator < Generator
    def generate(site)
      doc = HubspotPost.new('_posts/2018-03-21-something.md', site: site, collection: site.posts)

      doc.data['title'] = 'This is a test'
      doc.data['layout'] = 'post'
      doc.data['date'] = Time.now
      doc.data['slug'] = 'this-is-a-test'
      doc.content = 'Curabitur blandit tempus porttitor.'

      site.posts.docs << doc
    end
  end

end