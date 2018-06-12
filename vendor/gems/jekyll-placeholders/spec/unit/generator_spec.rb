require 'spec_helper'

describe Jekyll::Placeholders::Generator do

  before do
    @base = FileUtils.pwd
    @site = JekyllHelper.scaffold(collections: %w(articles podcasts))
    @generator = Jekyll::Placeholders::Generator.new
  end

  it 'should generate URLs with dynamic placeholders' do
    @site.config['collections']['podcasts']['permalink'] = '/podcasts/:test_slug/:slug'
    @site.collections['podcasts'].first.data['test_slug'] = 'testing'
    @generator.generate(@site)

    entry = @site.collections['podcasts'].first
    expect(entry.url).to eq("/podcasts/testing/#{entry.data.dig('slug')}")
  end

end