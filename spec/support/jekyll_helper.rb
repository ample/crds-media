class JekyllHelper

  def self.scaffold(path='../dummy/')
    begin
      Jekyll.logger.adjust_verbosity(quiet: true)
      fixtures_dir = File.expand_path(path, __dir__)
      overrides = Jekyll::Configuration.new.read_config_file(File.join(fixtures_dir, '_config.yml'))
      cfg = Jekyll::Utils.deep_merge_hashes(Jekyll::Configuration::DEFAULTS, overrides.merge({
        "source" => fixtures_dir,
        "destination" => File.join(fixtures_dir, '_site')
      }))
      site = Jekyll::Site.new(cfg)
      site.collections.keys.each { |key|
        # NOTE: we need to limit which collections are parsed otherwise build times increase exponentially
        if %w(articles podcasts).include?(key)
          site.collections[key].read
        end
      }
      site
    end
  end


end