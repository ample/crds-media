module Jekyll
  module DurationFilter

    def duration(seconds, format='short')

      # Articles should only show minutes
      if format == 'short'
        min = Time.at(seconds).utc.strftime('%M').to_i
        pluralize(min, 'min')

      # Not articles should display "HH:MM:SS" but should be pluralized and look super nice
      elsif format == 'long'
        h = (seconds / (60 * 60)).floor
        m = ((seconds / 60) % 60).floor
        s = (seconds % 60).floor

        arr = []
        arr.push(s) unless s == 0
        arr.push(m) unless m == 0
        arr.push(h) unless h == 0
        labels = %w(sec min hr)

        arr.each_with_index.collect do |n, i|
          label = labels[i]
          label = label == 'sec' ? "#{n} sec" : pluralize(n,label)
        end.reverse.join(' ')

      # Roll your own format by passing strftime args (https://www.foragoodstrftime.com/)
      else
        Time.at(seconds).utc.strftime(format).to_i
      end
    end

  end
end

Liquid::Template.register_filter(Jekyll::DurationFilter)