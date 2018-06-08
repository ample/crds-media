module Jekyll
  module Format_date
    def format_date(item)
      parsed = Date.parse(item.to_s)
      parsed.strftime("%b %-d, %Y")
    end
  end
end

Liquid::Template.register_filter(Jekyll::Format_date)