# Move some images to the website root for shorter URLs


module Jekyll
  class RootStaticFile < StaticFile
    def url
      "/#{name}"
    end
  end

  class CopyImagesGenerator < Generator
    safe true
    priority :low

    IMAGES = %w[
      8831.png
      8831.gif
    ]

    def generate(site)
      dir = "assets/images"

      IMAGES.each do |filename|
        source = File.join(site.source, dir, filename)

        unless File.file?(source)
          Jekyll.logger.warn "CopyImages:", "#{source} not found"
          next
        end

        site.static_files << RootStaticFile.new(site, site.source, dir, filename)
      end
    end
  end
end
