module Jekyll
    class BadgeTag < Liquid::Tag
        def initialize(tag_name, markup, tokens)
            super
            @project_name = markup
        end

        def render(context)
            project_name = @project_name.to_s.strip
            uri = URI::HTTPS.build(
                host: 'hackatime-badge.hackclub.com',
                path: '/U080HHYN0JD/' + URI.encode_www_form_component(project_name),
                query: URI.encode_www_form(
                    'style' => 'flat-square'
                )
            )
            alt = "Time spent on " + project_name

            %(<img class="hackatime-badge" src="#{uri}" alt="#{CGI.escapeHTML(alt)}">)
        end
    end
end

Liquid::Template.register_tag("timebadge", Jekyll::BadgeTag)