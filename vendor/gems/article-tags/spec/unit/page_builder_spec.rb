require 'spec_helper'

describe Jekyll::ArticleTags::PageBuilder do

  before do
    @site = JekyllHelper.scaffold(
      collections_dir: File.expand_path('../support/collections', __dir__),
      collections: %w(articles categories tags)
    )
    @page_builder = Jekyll::ArticleTags::PageBuilder.new(@site)
  end

  it 'should build out an array of article categories and tags accessible to site config' do
    exp_article_filters = [
      {
        "title" => "Category A",
        "slug" => "cat-a",
        "tags" => [
          {
            "title" => "Tag A1",
            "slug" => "tag-a1",
            "url" => "/articles/tags/cat-a+tag-a1"
          }
        ]
      }
    ]
    expect(@site.config['article_filters']).to match_array(exp_article_filters)
  end

  it 'creates a page only for tags featured by a category' do
    pending
    raise "Create the page"

    exp_page_data = ['Collection #1']
    expect(@site.pages.collect { |p| p.data['title'] }).to match_array(exp_page_data)
  end

  it 'runs the paginator' do
    pending
    raise "Run the paginator"

    exp_doc_titles = [["Powerhouse Trailer", "What's Crossroads?"]]
    page_doc_titles = @site.pages.collect { |d| d.data['articles']['docs'].collect(&:title) }
    expect(page_doc_titles).to match_array(exp_doc_titles)
  end

end
