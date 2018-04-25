module Jekyll
  class EnvGenerator < Generator
    attr_accessor :site

    def generate(site)
      @site = site
      @site.config['env'] = ENV['JEKYLL_ENV'] || 'development'
      @site.config['imgix'] = {
        'find': ENV['IMGIX_SRC'],
        'replace': ENV['IMGIX_DOMAIN']
      }
      @site.config['search_domain'] = ENV['SEARCH_DOMAIN'] || 'https://www.crossroads.net'
      @site.config['shared_header'] = {
        "cms" => "https://#{env_prefix}.crossroads.net/proxy/content/",
        "app" => "https://#{env_prefix}.crossroads.net/",
        "img" => "https://#{env_prefix}.crossroads.net/proxy/gateway/api/image/profile/",
        "prefix" => "#{env_prefix unless @site.config['env'] == 'production' }"
      }
      @site.config['url'] = ENV['SITE_URL'] if ENV['SITE_URL']
    end

    private

      def env_prefix
        envs = {
          development: 'int',
          int: 'int',
          demo: 'demo',
          production: 'www',
        }
        envs[@site.config['env'].to_sym]
      end

  end
end
