require 'spec_helper'

describe PagingMisterHyde::Paginator do

  before(:each) do
    @base = FileUtils.pwd
    @site = scaffold(@base)
  end

  context 'Articles' do
    before(:each) do
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
    before(:each) do
      @filename = 'podcasts.html'
      @page = Jekyll::Page.new(@site, @base, '', @filename)
      @paginator = PagingMisterHyde::Paginator.new(@site, @page)
    end

    it 'should sort podcasts by title' do
      data = @page.data['podcasts']['docs']
      titles = data.collect { |d| d.data['title'] }
      exp_titles = @site.collections['podcasts'].sort_by { |d| d.data['title'] }.collect { |d| d.data['title'] }

      # binding.pry
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

    def scaffold(path='../dummy/')
      @site ||= begin
        Jekyll.logger.adjust_verbosity(quiet: true)
        fixtures_dir = File.expand_path(path, __dir__)
        overrides = Jekyll::Configuration.new.read_config_file(File.join(fixtures_dir, '_config.yml'))
        cfg = Jekyll::Utils.deep_merge_hashes(Jekyll::Configuration::DEFAULTS, overrides.merge({
          "source" => fixtures_dir,
          "destination" => File.join(fixtures_dir, '_site')
        }))
        site = Jekyll::Site.new(cfg)
        site.collections.keys.each { |key| site.collections[key].read }
        site
      end
    end

end