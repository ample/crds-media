require 'securerandom'
require 'fileutils'

# TODO: Refactor, then document.

Jekyll::Hooks.register(:site, :after_init) do |site|
  site.config['asset_dest'] ||= 'assets'

  if (ENV['JEKYLL_ENV'] ||= 'development') == 'development'
    (site.config['keep_files'] ||= []).push(site.config['asset_dest'])
  end
end

Jekyll::Hooks.register(:site, :pre_render) do |site|
  asset_hash_file = 'tmp/.asset_hash'
  asset_dir = "#{site.config['destination']}/#{site.config['asset_dest']}"
  asset_src_dir = '_assets'

  asset_files = Dir.glob("#{asset_dir}/**/*").select { |f| f.ends_with?('.css') || f.ends_with?('.js') }
  asset_src_files = Dir.glob("#{asset_src_dir}/**/*").select { |f| f.ends_with?('.scss') || f.ends_with?('.js') }

  site.config['build_assets'] = false

  if ENV['BUILD_ASSETS'].to_s == 'true' || !File.exists?(asset_hash_file) || asset_files.blank? || asset_src_files.select { |f| File.mtime(f) >= File.mtime(asset_hash_file) }.any?
    site.config['asset_hash'] = SecureRandom.hex(12)
    site.config['build_assets'] = true
  else
    site.config['asset_hash'] = File.read(asset_hash_file)
  end
end

Jekyll::Hooks.register(:site, :post_write) do |site|
  asset_hash_file = 'tmp/.asset_hash'
  asset_dir = "#{site.config['destination']}/#{site.config['asset_dest']}"

  if site.config['build_assets']
    %w{js css}.each { |ext| FileUtils.rm(Dir.glob("#{asset_dir}/**/*.#{ext}")) }

    system("ASSET_HASH=#{site.config['asset_hash']} npm run build")
    File.open(asset_hash_file, 'w+') { |f| f.write(site.config['asset_hash']) }
  end
end
