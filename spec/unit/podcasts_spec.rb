require 'spec_helper'

describe 'podcasts' do
  before do
    @base = FileUtils.pwd
    @site = JekyllHelper.scaffold(
      collections_dir: File.expand_path('../support/collections', __dir__),
      collections: %w(podcasts episodes)
    )
  end


  it 'should be sorted by most recent episode' do
    @filename = 'podcasts.html'
    @page = Jekyll::Page.new(@site, @base, '', @filename)
  end
end

# From the terminal:
# layouts = { "default" => Jekyll::Layout.new(@site, "../../_layouts", "podcasts.html")}
# @page.render(layouts, @site.site_payload)