module Jekyll
  class EnvGenerator < Generator
    attr_accessor :site

    def generate(site)
      @site = site
      @site.config['env'] = ENV['JEKYLL_ENV'] || 'development'
      @site.config['shared_header'] = {
        "cms" => "//#{env_prefix}.crossroads.net/proxy/content/",
        "app" => "//#{env_prefix}.crossroads.net/",
        "img" => "//#{env_prefix}.crossroads.net/proxy/gateway/api/image/profile/",
        "prefix" => "#{env_prefix unless @site.config['env'] == 'production' }"
      }
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