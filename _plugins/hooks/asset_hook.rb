require 'securerandom'

Jekyll::Hooks.register(:site, :after_init) do |site|
  site.config['asset_dest'] ||= 'assets'
  site.config['asset_hash'] = SecureRandom.hex(12)

  binding.pry

  if ((ENV['JEKYLL_ENV'] ||= 'development') == 'development')
    (site.config['keep_files'] ||= []).push(site.config['asset_dest'])
  end
end

Jekyll::Hooks.register(:site, :post_write) do |site|
  system("ASSET_HASH=#{site.config['asset_hash']} npm run build")
end
