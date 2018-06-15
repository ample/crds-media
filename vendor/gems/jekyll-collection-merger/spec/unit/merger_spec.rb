require 'spec_helper'

describe Jekyll::CollectionMerger::Merger do

  before do
    @site = JekyllHelper.scaffold(
      collections_dir: File.expand_path('../support/collections', __dir__),
      collections: %w(articles episodes authors)
    )
  end

  def init_merger(options = {})
    @merger ||= begin
      options.symbolize_keys
      @merger = Jekyll::CollectionMerger::Merger.new(
        site: @site,
        name: 'recent_media',
        config: {
          'merge' => options[:merge] || ['articles', 'episodes'],
          'sort' => options[:sort] || 'date desc'
        }
      )
    end
  end

  it 'requires site, name, and config options' do
    # Missing config
    expect {
      Jekyll::CollectionMerger::Merger.new(site: @site, name: 'recent_media')
    }.to raise_error(ArgumentError)
    # Missing name
    expect {
      Jekyll::CollectionMerger::Merger.new(site: @site, config: { 'merge' => ['articles'] })
    }.to raise_error(ArgumentError)
    # Missing site
    expect {
      Jekyll::CollectionMerger::Merger.new(name: 'recent_media', config: { 'merge' => ['articles'] })
    }.to raise_error(ArgumentError)
    # Blank site
    expect {
      Jekyll::CollectionMerger::Merger.new(site: {}, name: 'recent_media', config: { 'merge' => ['articles'] })
    }.to raise_error(ArgumentError)
  end

  it 'can sort in descending order' do
    init_merger(sort: 'date desc')
    expect(@site.config['recent_media'].first.data['date']).to eq(Time.parse('2018-05-12T00:00-04:00'))
  end

  it 'sorts in ascending order by default' do
    init_merger(sort: 'date')
    expect(@site.config['recent_media'].first.data['date']).to eq(Time.parse('2018-04-27T00:00-04:00'))
  end

  it 'can sort by non-date attributes' do
    init_merger(sort: 'title')
    expect(@site.config['recent_media'].first.data['title']).to eq('Article #1')
  end

end