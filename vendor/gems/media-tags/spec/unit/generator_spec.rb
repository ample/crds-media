require_relative '../spec_helper'

describe Jekyll::MediaTags::Generator do

  before do
    @site = JekyllHelper.scaffold(
      collections_dir: File.expand_path('../support/collections', __dir__),
      collections: %w(videos tags)
    )
    @generator = Jekyll::MediaTags::Generator.new
    @generator.generate(@site)
  end

  it 'should generate pages for each tag' do
    urls = %w(
      /tags/another-collection/index.html
      /tags/collection-01/index.html
      /tags/featured-but-no-videos/index.html
      /tags/missing-key/index.html
    )
    expect(@site.pages.collect(&:url)).to match_array(urls)
  end

end
