require 'spec_helper'

describe Jekyll::VideoTags::Generator do

  before do
    @site = JekyllHelper.scaffold(
      collections_dir: File.expand_path('../support/collections', __dir__),
      collections: %w(videos)
    )
    @generator = Jekyll::VideoTags::Generator.new
    @generator.generate(@site)
  end

  it 'should generate pages for video tags' do
    urls = %w(
      /videos/tags/another-collection/index.html
      /videos/tags/awesomeness/index.html
      /videos/tags/collection-1/index.html
      /videos/tags/culture/index.html
    )
    expect(@site.pages.collect(&:url)).to match_array(urls)
  end

end
