require_relative '../spec_helper'

describe Jekyll::CollectionMerger::Generator do

  let(:overrides) {
    {
      merged_collections: {
        recent_media: { merge: ['articles', 'episodes'], sort: 'date desc' }
      }
    }
  }

  before do
    @site = JekyllHelper.scaffold(
      collections_dir: File.expand_path('../support/collections', __dir__),
      collections: %w(articles episodes authors),
      config_overrides: overrides
    )
    @generator = Jekyll::CollectionMerger::Generator.new
  end

  it 'should create an array available on the site\'s config' do
    expect(@site.config['recent_media'].class).to eq(NilClass)
    @generator.generate(@site)
    expect(@site.config['recent_media'].class).to eq(Array)
  end

  it 'should include articles and episodes, but not authors' do
    @generator.generate(@site)
    expect(@site.config['recent_media']).to include(@site.collections['articles'].docs.first)
    expect(@site.config['recent_media']).to include(@site.collections['episodes'].docs.first)
    expect(@site.config['recent_media']).to_not include(@site.collections['authors'].docs.first)
  end

end