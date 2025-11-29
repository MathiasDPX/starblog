module Jekyll
  class TagPage < Page
    def initialize(site, base, tag, posts)
      @site = site
      @base = base
      @dir = "tags/#{Utils.slugify(tag)}"
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "tag.html")
      self.data["tag"] = tag
      self.data["title"] = "Tag: #{tag}"
      self.data["posts"] = posts.sort_by { |p| p.date }.reverse
    end
  end

  class TagPageGenerator < Generator
    safe true

    def generate(site)
      tags = {}

      site.collections.each do |name, collection|
        collection.docs.each do |doc|
          if doc.data["tags"]
            doc.data["tags"].each do |tag|
              tags[tag] ||= []
              tags[tag] << doc
            end
          end
        end
      end

      site.posts.docs.each do |post|
        if post.data["tags"]
          post.data["tags"].each do |tag|
            tags[tag] ||= []
            tags[tag] << post
          end
        end
      end

      tags.each do |tag, posts|
        site.pages << TagPage.new(site, site.source, tag, posts.uniq)
      end
    end
  end
end
