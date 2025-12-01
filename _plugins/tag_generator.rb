module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      tags = site.collections['articles'].docs.flat_map { |doc| doc.data['tags'] || [] }.uniq

      tags.each do |tag|
        site.pages << TagPage.new(site, tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, tag)
      @site = site
      @base = site.source
      @dir = "tags/#{tag}"
      @name = 'index.html'

      self.process(@name)
      self.data = {
        'layout' => 'tag',
        'tag' => tag,
        'title' => "Posts tagged \"#{tag}\""
      }
    end
  end
end
