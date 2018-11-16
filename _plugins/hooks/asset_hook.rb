# Build assets if:
#
#   1. Token file does not exist. (Token file is created when a build is
#      completed.)
#   2. There are no CSS or JS assets in the destination directory.
#   3. Any CSS or JS asset in the destination directory has a modified date
#      newer than build date.
#
Jekyll::Hooks.register(:site, :post_write) do |site|
  date_file = "tmp/_token"

  if !File.exists?(date_file)
    puts('--- File does not exist ---')
    system('npm run build')
  else
    modified_date = Time.at(File.read(date_file).to_i / 1000)
    dest = site.config.dig('assets', 'destination') || 'assets'

    files = (Dir.glob("#{dest}/**/*.css") + Dir.glob("#{dest}/**/*.js")).flatten
    if files.blank?
      puts('--- No assets in build dir ---')
      system('npm run build')
    else
      modified_files = files.select { |f| File.mtime(f) >= modified_date }
      if modified_files.any?
        puts('--- Assets modified ---')
        system('npm run build')
      end
    end
  end

end


