require 'spec_helper'

describe 'Jekyll::SubtopicsGenerator' do

  before do
    @site = JekyllHelper.scaffold(
      collections_dir: File.expand_path('../support/collections', __dir__),
      collections: %w(articles tags topics videos)
    )
    @generator = Jekyll::SubtopicsGenerator.new
    @generator.generate(@site)
  end

  it 'applies tags to each topic as appropriate' do
    expect(get_topic('Culture').data['tags']).to match_array([get_tag('Fun'), get_tag('Pop Culture')])
    expect(get_topic('Faith').data['tags']).to match_array([get_tag('Fear')])
  end

  private

    def get_topic(title)
      @site.collections['topics'].docs.detect { |t| t.data['title'] == title }
    end

    def get_tag(title)
      @site.collections['tags'].docs.detect { |t| t.data['title'] == title }
    end

end
