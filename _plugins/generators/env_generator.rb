module Jekyll
  class EnvGenerator < Generator
    attr_accessor :site

    def generate(site)
      @site = site
      @site.config['ENV'] = ENV.to_h
      @site.config['jekyll_env'] = ENV['JEKYLL_ENV'] || 'development'
      @site.config['imgix'] = {
        'find': ENV['IMGIX_SRC'],
        'replace': ENV['IMGIX_DOMAIN'],
      }
      @site.config['default_image'] = "//#{ENV['IMGIX_DOMAIN']}/default-image.jpg"
      @site.config['search_domain'] = ENV['SEARCH_DOMAIN'] || 'https://www.crossroads.net'
      @site.config['shared_header'] = {
        "cms" => "https://#{env_prefix}.crossroads.net/proxy/content/",
        "app" => "https://#{env_prefix}.crossroads.net/",
        "img" => "https://#{env_prefix}.crossroads.net/proxy/gateway/api/image/profile/",
        "prefix" => "#{env_prefix unless @site.config['jekyll_env'] == 'production' }"
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
        envs[@site.config['jekyll_env'].to_sym]
      end

  end
end
