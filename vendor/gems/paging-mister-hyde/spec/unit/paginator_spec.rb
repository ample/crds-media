require 'spec_helper'

describe PagingMisterHyde::Paginator do

  before(:each) do
    base = FileUtils.pwd
    @site = scaffold(base)
    @page = Jekyll::Page.new(@site, base, "", "articles.html")
    @paginator = PagingMisterHyde::Paginator.new(@site, @page)
  end

  it 'should paginate' do
    data = @page.data['posts']
    expect(data['docs']).to be_a(Array)
  end

  private

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
        site.collections['posts'].read
        site
      end
    end

end