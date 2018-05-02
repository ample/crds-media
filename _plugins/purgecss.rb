Jekyll::Hooks.register(:site, :after_init) do |_site|
  Dir.glob('_site/assets/*.css').each { |f| File.delete(f) }
end

Jekyll::Hooks.register(:site, :post_write) do |_site|
  css_file = Dir.glob('_site/assets/*.css').first
  system("purgecss --css #{css_file} --out _site/assets --content _site/**/*.html")
end
