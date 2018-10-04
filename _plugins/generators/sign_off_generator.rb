module Jekyll
  class SignOffGenerator < Generator

    def generate(site)
      site.config['sign_off'] = site.collections['sign_offs'].docs.first
    end

  end
end
