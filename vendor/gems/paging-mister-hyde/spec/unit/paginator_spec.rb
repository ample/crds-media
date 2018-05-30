require 'spec_helper'

describe PagingMisterHyde::Paginator do

  before do
    @base = FileUtils.pwd
    @site = JekyllHelper.scaffold(@base)
  end

  context 'with an offset' do

    before do
      @total_docs = @site.collections['articles'].docs.count
      @page = Jekyll::Page.new(@site, @base, "", "articles.html")
      @page.data['paginate'] = {
        "articles" => {
          "offset" => 5,
          "per" => @total_docs
        }
      }
      @paginator = PagingMisterHyde::Paginator.new(@site, @page)
    end

    it 'should exclude the offset items from front of the pagination array' do
      expect(@page.data.dig('articles', 'offset').count).to eq(5)
      expect(@page.data.dig('articles', 'docs').count).to eq(@total_docs - 5)
    end

  end

  context 'Articles' do
    before do
      @filename = "articles.html"
      @page = Jekyll::Page.new(@site, @base, "", @filename)
      @paginator = PagingMisterHyde::Paginator.new(@site, @page)
      @articles = @site.pages.select{|p| p.instance_variable_get('@name') == @filename }
    end

    it 'should paginate' do
      data = @page.data['articles']
      expect(data['docs']).to be_a(Array)
    end

    it 'should sort articles in reverse chronological order' do
      data = @page.data['articles']['docs']
      dates = data.collect { |d| d.data['date'].to_i }
      per = @page.data.dig('paginate', 'articles', 'per')
      exp_dates = @site.collections['articles'].sort_by { |d| d.data['date'].to_i }.reverse.take(per).collect { |d| d.data['date'].to_i }
      expect(dates).to eq(exp_dates)
    end

    it 'should return previous page number' do
      expect(@paginator.send(:previous_page_number, 2)).to eq(1)
      expect(@paginator.send(:previous_page_number, 1)).to eq(false)
    end

    it 'should return next page number' do
      expect(@paginator.send(:next_page_number, 2, 3)).to eq(3)
      expect(@paginator.send(:next_page_number, 3, 3)).to eq(false)
    end

    context 'physical file' do
      it 'should be populated with values required by _pagination.html partial' do
        data = @page.data['articles']
        pagination_expectations(data)
      end
    end

    context 'dynamically generated file' do
      it 'should be populated with value required by _pagination.html partial' do
        @site.pages.each do |p|
          data = p.data['articles']
          pagination_expectations(data)
        end
      end
    end

  end

  context 'Podcasts' do

    before do
      @filename = 'podcasts.html'
      @page = Jekyll::Page.new(@site, @base, '', @filename)
      @paginator = PagingMisterHyde::Paginator.new(@site, @page)
    end

    it 'should sort podcasts by title' do
      data = @page.data['podcasts']['docs']
      titles = data.collect { |d| d.data['title'] }
      exp_titles = @site.collections['podcasts'].sort_by { |d| d.data['title'] }.collect { |d| d.data['title'] }
      expect(titles).to eq(exp_titles)
    end

  end

  private

    def pagination_expectations(frontmatter)
      expect(frontmatter['total_pages']).to eq(@articles.count + 1)
      expect(frontmatter['page']).to be_instance_of(Integer)

      if frontmatter['page'] == 1
        expect(frontmatter['previous_page']).to be(false)
      else
        expect(frontmatter['previous_page']).to be_instance_of(Integer)
      end

      if frontmatter['page'] == @articles.count + 1
        expect(frontmatter['next_page']).to be(false)
      else
        expect(frontmatter['next_page']).to be_instance_of(Integer)
      end
    end

end