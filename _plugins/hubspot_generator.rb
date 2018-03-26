require 'dotenv/load'
require 'pry'
require 'jekyll'
require 'hubspot-ruby'

module Jekyll

  class HubspotPost < Document
    def draft?
      false
    end
  end

  class HubspotGenerator < Generator
    def generate(site)

      Hubspot.configure(hapikey: ENV['HUBSPOT_API'])

      blog = Hubspot::Blog.find_by_id ENV['HUBSPOT_BLOG_ID']
      blog.posts.each do |post|
        properties = post.instance_variable_get('@properties')

        published_at = DateTime.strptime post.instance_variable_get('@properties')['publish_date'].to_s[0..9], '%s'
        slug = properties['slug'].sub(/blog\//,'')

        doc = HubspotPost.new("_posts/#{published_at.strftime('%Y-%m-%d')}-#{slug}.md", site: site, collection: site.posts)
        doc.data['title'] = properties['title']
        doc.content = properties['post_body']
        doc.data['layout'] = 'post'
        doc.data['date'] = published_at
        doc.data['slug'] = slug
        doc.data['featured_image'] = post['featured_image']
        doc.data['author'] = post['blog_post_author']['display_name']
        
        site.posts.docs << doc
      end
    end
  end
end
