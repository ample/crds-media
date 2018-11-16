require 'securerandom'

Jekyll::Hooks.register(:site, :after_init) do |site|
  site.config['asset_hash'] = SecureRandom.hex(12)
end

Jekyll::Hooks.register(:site, :post_write) do |site|
  system("ASSET_HASH=#{site.config['asset_hash']} npm run build")
end
