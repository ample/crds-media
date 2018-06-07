require 'spec_helper'

describe Jekyll::VideoTags::PageBuilder do

  before do
    @site = JekyllHelper.scaffold(
      collections_dir: File.expand_path('../support/collections', __dir__),
      collections: %w(videos)
    )
    @page_builder = Jekyll::VideoTags::PageBuilder.new(@site)
  end

  it 'should build out an array of video tags accessible to site config' do
    exp_video_tags = [
      {"title"=>"Another Collection", "slug"=>"another-collection", "url"=>"/videos/tags/another-collection"},
      {"title"=>"Awesomeness", "slug"=>"awesomeness", "url"=>"/videos/tags/awesomeness"},
      {"title"=>"Collection #1", "slug"=>"collection-1", "url"=>"/videos/tags/collection-1"},
      {"title"=>"culture", "slug"=>"culture", "url"=>"/videos/tags/culture"}
    ]
    expect(@site.config['video_tags']).to match_array(exp_video_tags)
  end

  it 'creates a page for each tag' do
    exp_page_data = [
      {"paginate"=>{"videos"=>{"per"=>8, "where"=>{"tags"=>":title"}}}, "layout"=>"default", "slug"=>"another-collection", "title"=>"Another Collection"},
      {"paginate"=>{"videos"=>{"per"=>8, "where"=>{"tags"=>":title"}}}, "layout"=>"default", "slug"=>"awesomeness", "title"=>"Awesomeness"},
      {"paginate"=>{"videos"=>{"per"=>8, "where"=>{"tags"=>":title"}}}, "layout"=>"default", "slug"=>"collection-1", "title"=>"Collection #1"},
      {"paginate"=>{"videos"=>{"per"=>8, "where"=>{"tags"=>":title"}}}, "layout"=>"default", "slug"=>"culture", "title"=>"culture"}
    ]
    expect(@site.pages.collect { |p| p.data }).to match_array(exp_page_data)
  end

end
