# https://mrinalcs.github.io/open-external-links-in-new-tab-in-jekyll

require 'uri'

[:documents, :pages].each do |hook|
  Jekyll::Hooks.register hook, :post_render do |item|
    next unless item.output_ext == ".html"
    content  = item.output
    site_url = item.site.config['url'].to_s.sub(%r{\Ahttps?://}, '')

    # whitelisted domains / schemes that should be left alone
    whitelist_domains = ['cloudinary.com', 'mathiasd.fr']
    whitelist_schemes = ['mailto:', 'tel:']

    # regexp that matches an <a ... href="..."> (preserves surrounding attrs)
    content.gsub!(%r{<a\b([^>]*?)\bhref=(["'])([^"'>]+)\2([^>]*)>}i) do
      pre_attrs  = $1 # attributes before href
      quote      = $2
      href       = $3
      post_attrs = $4 # attributes after href

      full_tag = "<a#{pre_attrs} href=#{quote}#{href}#{quote}#{post_attrs}>"

      # if rel or target already present -> leave unchanged
      if (pre_attrs + post_attrs) =~ /\brel\s*=/i || (pre_attrs + post_attrs) =~ /\btarget\s*=/i
        full_tag
      # whitelist by scheme (mailto:, tel:) or domain substring
      elsif whitelist_schemes.any? { |s| href.start_with?(s) } ||
            whitelist_domains.any? { |d| href =~ /(^|\W)#{Regexp.escape(d)}(\W|$)/i }
        full_tag
      else
        # Treat as local if:
        #  - relative path (starts with / or #)
        #  - protocol-less like //localhost:4000
        #  - absolute with host matching localhost, 127.0.0.1, or 192.168.x.x (ports ignored)
        is_local = false
        if href.start_with?('/', '#')
          is_local = true
        else
          # try to extract host (safe parse)
          begin
            parsed = URI.parse(href)
            host = parsed.host
            # URI.parse can return nil for protocol-less //host paths; handle that:
            if host.nil? && href =~ %r{^//([^/]+)} # //host[:port]...
              host = $1.split(':').first
            end
            if host
              is_local = !!(host =~ /\A(?:localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3})\z/)
            end
          rescue URI::InvalidURIError
            # if parsing fails, fall back to checking beginning for protocol-less localhost:port
            is_local ||= href =~ %r{\A(?::)?//?(?:localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3})(?::\d+)?}i
          end
        end

        # leave local links unchanged
        if is_local
          full_tag
        else
          # append ref param correctly (use & if ? already present)
          separator = href.include?('?') ? '&' : '?'
          new_href = "#{href}#{separator}ref=#{site_url}"

          # preserve original pre/post attributes and add target & rel
          # but avoid duplicating attributes if present (we already checked)
          %Q{<a#{pre_attrs} href=#{quote}#{new_href}#{quote}#{post_attrs} target="_blank" rel="nofollow noopener noreferrer">}
        end
      end
    end

    item.output = content
  end
end

